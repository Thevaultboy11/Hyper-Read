import { Router } from "express";
import User from "../Models/Users";
import { createHash } from "crypto";
import CsillaDataSource from "../Modules/CsillaDataSource";
import handleInternalServerError from "../Errors/InternalServerError";
import handleBadRequest from "../Errors/BadRequest";

const routes = Router();

routes.post("/", async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const wpm = req.body.wpm || null;
		const divisionId = null;
		const score = 0;

		if (!email || !password || !firstName || !lastName) {
			return handleBadRequest(res);
		}
		const emailRegex =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(email)) {
			return res.status(400).send({
				msg: "Invalid email format!",
			});
		}
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
		if (!passwordRegex.test(password)) {
			return res.status(400).send({
				msg: "Password must be at least 6 characters long and contain one lowercase letter, one uppercase letter, one special character and one number!",
			});
		}

		const user = new User();
		user.email = email;
		user.password = createHash("sha256").update(password).digest("hex");
		user.lastName = lastName;
		user.firstName = firstName;
		user.wpm = wpm || null;
		user.divisionId = divisionId;
		user.score = score;
		user.isAdmin = 0; 
		try {
			const existingUser = await CsillaDataSource.getRepository(User)
				.createQueryBuilder("user")
				.where("user.email = :userEmail", { userEmail: email })
				.getOne();
			if (existingUser) {
				return res.status(409).send({
					msg: "User already exists!",
				});
			}
		} catch (error) {
			return handleInternalServerError(error, res);
		}
		try {
			await CsillaDataSource.getRepository(User).save(user);
			return res.status(200).send({
				msg: "User successfully registered!",
			});
		} catch (error) {
			return handleInternalServerError(error, res);
		}
	} catch (error) {
		return handleInternalServerError(error, res);
	}
});

export default routes;
