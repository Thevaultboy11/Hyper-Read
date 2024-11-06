import { Router } from "express";
import decodejwt from "../Modules/decodeJwt";
import handleInternalServerError from "../Errors/InternalServerError";
import CsillaDataSource from "../Modules/CsillaDataSource";
import Books from "../Models/Books";
import fs from "fs";
import isAuth from "../Middleware/isAuth";
import handleBadRequest from "../Errors/BadRequest";
import Library from "../Models/Library";
import handleUnauthorized from "../Errors/Unauthorized";
import handleNotFound from "../Errors/NotFound";
import isAdmin from "../Middleware/isAdmin";

require("dotenv").config();
const FILE_PATH = process.env.FILE_PATH;
const MAX_WORDS_PER_PAGE = 300;
const PDFExtract = require("pdf-text-extract");
const routes = Router();

routes.get("/list/", isAdmin(), async (req, res) => {
	try {
		const books = await CsillaDataSource.getRepository(Books).find({
			where: {
				public: 1,
			},
			select: [
				"id",
				"fileName",
				"size",
				"author",
				"totalPages",
				"title",
				"public",
			],
		});

		res.status(200).send(books);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/random-pages/", async (req, res) => {
	const options = { type: "text" };

	try {
		const randomBook = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select(
				"book.fileName, book.title, book.currentPage, book.totalPages"
			)
			.where("book.public = 1")
			.orderBy("RAND()")
			.getRawOne();

		if (!randomBook) {
			return handleNotFound(res);
		}

		const filePath = `${FILE_PATH}/${randomBook.fileName}.pdf`;

		const data = await new Promise<string[]>((resolve, reject) => {
			PDFExtract(filePath, options, (err, data) => {
				if (err) {
					reject("Error extracting text from PDF");
				} else {
					resolve(data);
				}
			});
		});

		const totalPages = data.length;

		const randomPages = [];
		while (randomPages.length < 5) {
			const randomPage = Math.floor(Math.random() * totalPages) + 1;
			if (!randomPages.includes(randomPage)) {
				randomPages.push(randomPage);
			}
		}

		let extractedText = "";
		const pages = {};
		let prevPageText = "";
		for (let i = 0; i < randomPages.length; i++) {
			const pageNumber = randomPages[i];
			if (pageNumber <= totalPages) {
				let pageText = data[pageNumber - 1];

				if (pageText && pageText.trim() !== "") {
					if (pageText.split(" ").length > MAX_WORDS_PER_PAGE) {
						const words = pageText.split(" ");
						pageText = words.slice(0, MAX_WORDS_PER_PAGE).join(" ");
						pageText += " ...";
					}

					if (pageText !== prevPageText) {
						extractedText += `Page ${pageNumber}\n\n${pageText}\n\n`;
						pages[pageNumber] = pageText;
						prevPageText = pageText;
					}
				}
			}
		}

		const format = {
			title: randomBook.title,
			totalPages: totalPages,
			currentPage: randomBook.currentPage,
			pages,
		};
		res.status(200).send(format);
	} catch (error) {
		if (error === "Invalid page range") {
			handleBadRequest(res);
		} else {
			handleInternalServerError(error, res);
		}
	}
});

routes.get("/content/:id", async (req, res) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const startPage = Number(req.query.start);
	const endPage = Number(req.query.end);
	const options = { type: "text" };
	const bookId = req.params.id;
	const user_id = token.id;

	try {
		const book = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select(
				"book.fileName, book.title, book.currentPage, book.totalPages"
			)
			.leftJoin("book.library", "library", "library.userId = :userId", {
				userId: user_id,
			})
			.where(
				"book.id = :id AND (book.public = 1 OR library.id IS NOT NULL)",
				{ id: bookId }
			)
			.getRawOne();

		if (!book) {
			return handleNotFound(res);
		}

		const filePath = `${FILE_PATH}/${book.fileName}.pdf`;

		if (startPage > endPage) {
			await Promise.reject("Invalid page range");
		}

		const data = await new Promise((resolve, reject) => {
			PDFExtract(filePath, options, (err, data) => {
				if (err) {
					reject("Error extracting text from PDF");
				} else {
					resolve(data);
				}
			});
		});

		let extractedText = "";
		const pages = {};
		let prevPageText = "";
		for (let i = startPage; i <= endPage; i++) {
			let pageText = data[i];

			if (!pageText || pageText.trim() === "") {
				pageText = "Empty page";
			} else if (pageText.split(" ").length > MAX_WORDS_PER_PAGE) {
				const words = pageText.split(" ");
				pageText = words.slice(0, MAX_WORDS_PER_PAGE).join(" ");
				pageText += " ...";
			}

			if (pageText !== prevPageText) {
				extractedText += `Page ${i}\n\n${pageText}\n\n`;
				pages[i] = pageText;
				prevPageText = pageText;
			}
		}

		const format = {
			title: book.title,
			totalPages: book.totalPages,
			currentPage: book.currentPage,
			pages,
		};
		res.status(200).send(format);
	} catch (error) {
		if (error === "Invalid page range") {
			handleBadRequest(res);
		} else {
			handleInternalServerError(error, res);
		}
	}
});

routes.patch("/read/:bookId", isAuth(), async (req, res, next) => {
	const bookId = req.params.bookId;

	try {
		if (!bookId) {
			return handleNotFound(res);
		}

		const book = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder()
			.where("id = :id", { id: bookId })
			.getOne();

		if (!book) {
			return handleNotFound(res);
		}

		const isRead = book.isRead === 1 ? 0 : 1;

		await CsillaDataSource.getRepository(Books)
			.createQueryBuilder()
			.update(Books)
			.set({
				isRead,
				isReadDate: isRead === 1 ? new Date() : null,
			})
			.where("id = :id", { id: bookId })
			.execute();

		res.status(200).send(
			`Book ${
				isRead === 1 ? "marked as read" : "marked as unread"
			} successfully!`
		);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.post("/page/:bookId/:page", isAuth(), async (req, res, next) => {
	const bookId = req.params.bookId;
	const newPage = req.params.page;

	try {
		if (!bookId || !newPage) {
			return handleBadRequest(res);
		}

		const token = decodejwt(req.cookies["next-auth.session-token"], res);
		const user_id = token.id;

		const libraryEntry = await CsillaDataSource.getRepository(
			Library
		).findOne({
			where: { userId: user_id, bookId: Number(bookId) },
		});

		if (!libraryEntry) {
			return handleNotFound(res);
		}

		await CsillaDataSource.getRepository(Books)
			.createQueryBuilder()
			.update(Books)
			.set({
				currentPage: Number(newPage),
			})
			.where("id = :id", { id: bookId })
			.execute();

		res.status(200).send("Page changed successfully!");
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.delete("/remove/:bookId", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const bookId = Number(req.params.bookId);
	const userId = token.id;
	const bookRepository = CsillaDataSource.getRepository(Books);
	const book = await bookRepository.findOne({
		where: { id: Number(bookId) },
		relations: ["user"],
	});
	const error = "Unauthorized!";

	if (!book) {
		return handleNotFound(res);
	}

	if (book.user.id !== userId) {
		return handleUnauthorized(error, res);
	}

	try {
		const filePath = `${FILE_PATH}/${book.fileName}.pdf`;
		fs.unlinkSync(filePath);
		await bookRepository.delete(bookId);
		return res.status(200).send({ msg: "Book successfully deleted!" });
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

export default routes;
