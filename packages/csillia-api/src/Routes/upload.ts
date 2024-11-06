import { Router } from "express";
import multer from "multer";
import isAuth from "../Middleware/isAuth";
import decodejwt from "../Modules/decodeJwt";
import handleInternalServerError from "../Errors/InternalServerError";
import CsillaDataSource from "../Modules/CsillaDataSource";
import Users from "../Models/Users";
import handleInvalidFileType from "../Errors/InvalidFileType";
import pdf from "pdf-page-counter";
import crypto from "crypto";
import fs from "fs";
import Library from "../Models/Library";
import handleBadRequest from "../Errors/BadRequest";
import Books from "../Models/Books";
import isAdmin from "../Middleware/isAdmin";

require("dotenv").config();

const routes = Router();
const FILE_PATH = process.env.FILE_PATH;
const date = new Date();
const res = "Invalid file type!";

const storage = multer.memoryStorage();

const upload = multer({
	storage: storage,
	limits: { fileSize: 24 * 1024 * 1024 },
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.pdf$/)) {
			return handleInvalidFileType(res);
		}
		cb(null, true);
	},
});

routes.post(
	"/books/",
	isAuth(),
	(req, res, next) => {
		const publicParam = req.query.public;

		if (publicParam === undefined) {
			return handleBadRequest(res);
		}

		const isPublic = Number(publicParam);

		if (isPublic === 0) {
			return next();
		} else {
			return isAdmin()(req, res, next);
		}
	},
	upload.any(),
	async (req, res, next) => {
		const books: Express.Multer.File[] = req.files as Express.Multer.File[];
		const pdfRegEx = /\.pdf$/i;
		const token = decodejwt(req.cookies["next-auth.session-token"], res);
		const savedBooks = [];

		for (const book of books) {
			if (!pdfRegEx.test(book.originalname)) {
				return handleInvalidFileType(res);
			}

			const fileName = crypto.randomUUID();
			const writeStream = fs.createWriteStream(
				`${FILE_PATH}/${fileName}.pdf`
			);
			writeStream.write(book.buffer);
			writeStream.end();

			const user = new Users();
			const bookModel = new Books();

			try {
				const data = await pdf(book.buffer);

				user.id = token.id;
				bookModel.fileName = fileName;
				bookModel.size = String(book.size);
				bookModel.title =
					req.body.title || book.originalname.split(".")[0];
				bookModel.user = user;
				bookModel.currentPage = 1;
				bookModel.totalPages = data.numpages;
				bookModel.isRead = 0;
				bookModel.isReadDate = null;
				bookModel.uploadedAt = new Date();
				bookModel.public = Number(req.query.public);
				bookModel.author = req.body.author || "Anonymous";

				await CsillaDataSource.getRepository(Books).save(bookModel);

				if (bookModel.public === 0) {
					await CsillaDataSource.getRepository(Library).save({
						user: user,
						book: bookModel,
					});
				}

				savedBooks.push(bookModel);
			} catch (error) {
				handleInternalServerError(error, res);
			}
		}

		if (savedBooks.length > 0) {
			return res.status(200).send({
				msg: "Books successfully uploaded!",
				books: savedBooks,
			});
		} else {
			return handleBadRequest(res);
		}
	}
);

export default routes;
