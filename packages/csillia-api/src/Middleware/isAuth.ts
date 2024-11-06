import jwt from "jsonwebtoken";
import handleUnauthorized from "../Errors/Unauthorized";
import { NextFunction, Request, Response } from "express";

require("dotenv").config();
const error = "Unauthorized!";
const JWT_SECRET = process.env.JWT_SECRET;

const isAuth =
	() => async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies["next-auth.session-token"];
		if (!token) {
			return handleUnauthorized(error, res);
		}
		try {
			jwt.verify(token, JWT_SECRET, { algorithm: "HS256" });
		} catch (error) {
			return handleUnauthorized(error, res);
		}
		return next();
	};
export default isAuth;
