import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/Users";
import { check } from "express-validator";
import isAuth from "../Middleware/isAuth";
import handleBadRequest from "../Errors/BadRequest";
import CsillaDataSource from "../Modules/CsillaDataSource";
import handleInvalidCredentials from "../Errors/InvalidCredentials";
import handleInternalServerError from "../Errors/InternalServerError";
import isAdmin from "../Middleware/isAdmin"
import decodejwt from "../Modules/decodeJwt";
import Users from "../Models/Users";
import handleUnauthorized from "../Errors/Unauthorized";

require("dotenv").config();

const routes = express.Router();
const crypto = require("crypto");
const JWT_SECRET = process.env.JWT_SECRET;

const jwtSign = async (user) => {
	const jwtPayload = {
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			created_at: Date.now(),
		},
	};
	const token = jwt.sign(jwtPayload, JWT_SECRET, {
		algorithm: "HS256",
		expiresIn: 86400,
	});
	return token;
};
routes.get("/isAdmin/", isAuth(), async (req, res) => {
	const error = "Unauthorized!";


	const token = decodejwt(req.cookies["next-auth.session-token"], res);
	try{
		const userId = token.id;

		if (!userId) {
			return handleUnauthorized(error, res);
		}

		const users = await CsillaDataSource.getRepository(Users).find({
			where: { id: userId, isAdmin: 1 },
			take: 1,
		});

		if (!users || users.length === 0) {
			res.status(401).send({message: "No admin?"})
		}else {
			res.status(200).send({message: "Admin auth"})
		}
	} catch(error){
		return handleInternalServerError(error, res); 
	}
})

routes.post(
	"/login/",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		if (!req.body.email || !req.body.password) {
			return handleBadRequest(res);
		}

		const { email, password } = req.body;
		const passwordHash = crypto
			.createHash("sha256")
			.update(password)
			.digest("hex");

		try {
			const user = await CsillaDataSource.getRepository(User)
				.createQueryBuilder("user")
				.where("user.email = :userEmail", { userEmail: email })
				.andWhere("user.password = :password", {
					password: passwordHash,
				})
				.getOne();

			if (!user) {
				return handleInvalidCredentials(res);
			}
			const token = await jwtSign(user);

			res.status(200).cookie("session", token).send({
				msg: "Login successful!",
				user
			});
		} catch (error) {
			handleInternalServerError(error, res);
		}
	}
);

routes.post("/logout/", isAuth(), async (req, res, next) => {
	try {
		res.status(200).clearCookie("session").json({
			msg: "Logout successful",
		});
	} catch (error) {
		handleInternalServerError(error, res);
	}
});

routes.get("/", isAuth(), (req, res, next) => {
	res.status(200).send({
		msg: "Authorized!",
	});
});

export default routes;
