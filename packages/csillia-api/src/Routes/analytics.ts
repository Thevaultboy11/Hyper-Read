import { Router } from "express";
import handleInternalServerError from "../Errors/InternalServerError";
import CsillaDataSource from "../Modules/CsillaDataSource";
import isAuth from "../Middleware/isAuth";
import decodejwt from "../Modules/decodeJwt";
import UserProgress from "../Models/UserProgress";
import LoginCount from "../Models/LoginCount";
import TimeCount from "../Models/TimeCount";
import handleBadRequest from "../Errors/BadRequest";

const routes = Router();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 120000,
	max: 1,
	keyGenerator: (req) => req.cookies["next-auth.session-token"],
});

routes.get("/wpm-pr/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const wpmPR = await CsillaDataSource.getRepository(UserProgress)
			.createQueryBuilder("userProgress")
			.select("MAX(userProgress.wpm)", "PR")
			.where("userProgress.userId = :userId", { userId: userId })
			.getRawOne();
		res.status(200).send(wpmPR);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/login-count/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const loginCount = await CsillaDataSource.getRepository(LoginCount)
			.createQueryBuilder("login_count")
			.select("COUNT(*)", "total_logins")
			.where("login_count.userId = :userId", { userId: userId })
			.getRawOne();

		res.status(200).send(loginCount);
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.post("/insert-login-count/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const { loginDate } = req.body;

		if (!loginDate) {
			return handleBadRequest(res);
		}

		const newLoginCount = new LoginCount();
		newLoginCount.userId = userId;
		newLoginCount.loginDate = loginDate;

		await CsillaDataSource.getRepository(LoginCount).save(newLoginCount);

		res.status(200).send({
			message: "Login count data inserted successfully!",
		});
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/wpm/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const currentYear = new Date().getFullYear();

		const monthlyAvgWpm = await CsillaDataSource.getRepository(UserProgress)
			.createQueryBuilder("userProgress")
			.select("DATE_FORMAT(userProgress.wpmDate, '%m')", "month")
			.addSelect("AVG(userProgress.wpm)", "avgWpm")
			.where("userProgress.userId = :userId", { userId: userId })
			.andWhere("YEAR(userProgress.wpmDate) = :currentYear", {
				currentYear,
			})
			.groupBy("month")
			.orderBy("month")
			.getRawMany();

		const data = Array(12).fill(0);
		monthlyAvgWpm.forEach((row) => {
			const month = parseInt(row.month) - 1;
			data[month] = Math.round(row.avgWpm);
		});

		res.status(200).send({ data });
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.post("/update-wpm/", isAuth(), limiter, async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;
	const wpm = req.body.wpm;
	const wpmDate = req.body.wpmDate;

	try {
		if (!wpm || !wpmDate) {
			return handleBadRequest(res);
		}
		const userProgress = new UserProgress();
		userProgress.wpm = wpm;
		userProgress.wpmDate = wpmDate;
		userProgress.userId = userId;

		await CsillaDataSource.getRepository(UserProgress).save(userProgress);

		res.status(200).send("Successfully updated speed reading progress!");
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/time-count/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const timeSpentInMinutes = await CsillaDataSource.getRepository(
			TimeCount
		)
			.createQueryBuilder("timeCount")
			.select("SUM(timeCount.timeSpent)", "totalMinutes")
			.where("timeCount.userId = :userId", { userId: userId })
			.getRawOne();

		const totalMinutes = timeSpentInMinutes.totalMinutes;
		let value;
		let type;

		if (totalMinutes < 60) {
			value = totalMinutes;
			type = "Minutes";
		} else if (totalMinutes >= 60 && totalMinutes < 1440) {
			value = Math.floor(totalMinutes / 60);
			type = "Hours";
		} else if (totalMinutes >= 1440 && totalMinutes < 43200) {
			value = Math.floor(totalMinutes / 1440);
			type = "Days";
		} else if (totalMinutes >= 43200 && totalMinutes < 525600) {
			value = Math.floor(totalMinutes / 43200);
			type = "Months";
		} else {
			value = Math.floor(totalMinutes / 525600);
			type = "Years";
		}

		res.status(200).send({
			value,
			type,
		});
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.post("/insert-screentime/", isAuth(), async (req, res, next) => {
	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	const userId = token.id;

	try {
		const { timeSpent, timeDate } = req.body;

		if (!timeSpent || !timeDate) {
			return handleBadRequest(res);
		}

		const newTimeCount = new TimeCount();
		newTimeCount.userId = userId;
		newTimeCount.timeSpent = parseFloat(timeSpent);
		newTimeCount.timeDate = timeDate;

		await CsillaDataSource.getRepository(TimeCount).save(newTimeCount);

		res.status(200).send({
			msg: "Screen time data inserted successfully!",
		});
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

export default routes;
