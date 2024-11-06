import { Router } from "express";
import decodejwt from "../Modules/decodeJwt";
import handleInternalServerError from "../Errors/InternalServerError";
import CsillaDataSource from "../Modules/CsillaDataSource";
import isAuth from "../Middleware/isAuth";
import Library from "../Models/Library";
import Books from "../Models/Books";

require("dotenv").config();
const routes = Router();

routes.get("/list/", isAuth(), async (req, res) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);

	try {
		const books = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.leftJoin("book.library", "library")
			.select([
				"book.id",
				"book.fileName",
				"book.size",
				"book.author",
				"book.totalPages",
				"book.title",
				"book.public",
				"book.currentPage",
			])
			.where("library.userId = :userId", { userId: token.id })
			.getMany();

		res.status(200).send(books);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.post("/add-book/:bookId", isAuth(), async (req, res) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);

	try {
		const user_id = token.id;
		const book_id = Number(req.params.bookId);

		const existingBook = await CsillaDataSource.getRepository(
			Library
		).findOne({
			where: { userId: user_id, bookId: book_id },
		});

		if (existingBook) {
			return res
				.status(201)
				.send({ msg: "Book already added to library!" });
		}

		const book = await CsillaDataSource.getRepository(Books).findOne({
			where: { id: Number(book_id), public: 1 },
		});

		if (!book) {
			return res
				.status(400)
				.send({ msg: "Book not found or is not public!" });
		}

		const libraryEntry = new Library();
		libraryEntry.userId = user_id;
		libraryEntry.bookId = book_id;

		await CsillaDataSource.getRepository(Library).save(libraryEntry);
		return res
			.status(200)
			.send({ msg: "Book successfully added to library!" });
	} catch (error) {
		handleInternalServerError(error, req);
	}
});

routes.delete("/remove-book/:bookId", isAuth(), async (req, res) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);

	try {
		const user_id = token.id;
		const book_id = Number(req.params.bookId);

		const libraryEntry = await CsillaDataSource.getRepository(
			Library
		).findOne({
			where: { userId: user_id, bookId: book_id },
		});

		if (!libraryEntry) {
			return res
				.status(400)
				.send({ msg: "Book not found in your library!" });
		}

		await CsillaDataSource.getRepository(Library).remove(libraryEntry);

		return res
			.status(200)
			.send({ msg: "Book successfully removed from library!" });
	} catch (error) {
		handleInternalServerError(error, req);
	}
});

routes.get("/search/", async (req, res) => {
	const q = req.query.q;

	try {
		const books = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.where("book.title LIKE :query", {
				query: `%${q}%`,
			})
			.andWhere("book.public = :public", { public: 1 })
			.getMany();

		if (books.length === 0) {
			res.status(200).send("No books found!");
		} else {
			res.status(200).send(books);
		}
	} catch (error) {
		return handleInternalServerError(error, res);
	}
});

export default routes;
