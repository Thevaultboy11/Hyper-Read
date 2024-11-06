import handleUnauthorized from "../Errors/Unauthorized";
import { NextFunction, Request, Response } from "express";
import decodejwt from "../Modules/decodeJwt";
import Users from "../Models/Users";
import CsillaDataSource from "../Modules/CsillaDataSource";

const error = "Unauthorized!";

const isAdmin =
	() => async (req: Request, res: Response, next: NextFunction) => {
		const token = decodejwt(req.cookies["next-auth.session-token"], res);
		const userId = token.id;

		if (!userId) {
			return handleUnauthorized(error, res);
		}

		const users = await CsillaDataSource.getRepository(Users).find({
			where: { id: userId, isAdmin: 1 },
			take: 1,
		});

		if (!users || users.length === 0) {
			return handleUnauthorized(error, res);
		}

		return next();
	};

export default isAdmin;
