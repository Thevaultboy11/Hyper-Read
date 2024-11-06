import { Router } from "express";
import handleInternalServerError from "../Errors/InternalServerError";
import CsillaDataSource from "../Modules/CsillaDataSource";
import Books from "../Models/Books";
import isAuth from "../Middleware/isAuth";
import decodejwt from "../Modules/decodeJwt";
import UserProgress from "../Models/UserProgress";

const routes = Router();

routes.get("/monthly/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const date = new Date();
		const monthAgo = new Date(
			date.getFullYear(),
			date.getMonth() - 1,
			date.getDate()
		);

		const monthlyProgress = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select("COUNT(*)", "count")
			.where("book.isRead = :isRead AND book.userId  = :userId", {
				isRead: true,
				userId,
			})
			.andWhere("book.isReadDate >= :monthAgo", {
				monthAgo: monthAgo.toISOString(),
			})
			.getRawOne();

		res.status(200).send(monthlyProgress);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/yearly/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const date = new Date();
		const yearAgo = new Date(
			date.getFullYear() - 1,
			date.getMonth(),
			date.getDate()
		);

		const yearlyProgress = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select("COUNT(*)", "count")
			.where("book.isRead = :isRead AND book.userId  = :userId", {
				isRead: true,
				userId,
			})
			.andWhere("book.isReadDate >= :yearAgo", {
				yearAgo: yearAgo.toISOString(),
			})
			.getRawOne();

		res.status(200).send(yearlyProgress);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/all-time/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const allTimeProgress = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select("COUNT(*)", "count")
			.where("book.isRead = :isRead AND book.userId = :userId", {
				isRead: true,
				userId,
			})
			.getRawOne();

		res.status(200).send(allTimeProgress);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/book-percentage/:bookId", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;
	const bookId = req.params.bookId;

	try {
		const bookPercentage = await CsillaDataSource.getRepository(Books)
			.createQueryBuilder("book")
			.select(
				"ROUND((book.currentPage/book.totalPages)*100, 2)",
				"percentage"
			)
			.where(
				"book.isRead = :isRead AND book.userId = :userId AND book.id = :bookId",
				{
					isRead: true,
					userId,
					bookId,
				}
			)
			.getRawOne();

		res.status(200).send(bookPercentage);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/get-wpm/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const wpm = await CsillaDataSource.getRepository(UserProgress)
			.createQueryBuilder("userprogress")
			.select("user_progress")
			.from(UserProgress, "user_progress")
			.where("userprogress.userId = :userId", { userId })
			.orderBy("userprogress.wpmDate", "DESC")
			.getRawOne();

		res.status(200).send(wpm);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

export default routes;
