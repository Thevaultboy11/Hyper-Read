import handleInternalServerError from "../Errors/InternalServerError";
import jwt from "jsonwebtoken";

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const decodejwt = (token, res) => {
	try {
		return jwt.verify(token, JWT_SECRET, { algorithm: "HS256" });
	} catch (error) {
		handleInternalServerError(error, res);
	}
};

export default decodejwt;
