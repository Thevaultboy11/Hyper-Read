import Users from "../Models/Users";
import Books from "../Models/Books";
import UserProgress from "../Models/UserProgress";
import { DataSource } from "typeorm";
import Divisions from "../Models/Divisions";
import LoginCount from "../Models/LoginCount";
import TimeCount from "../Models/TimeCount";
import Library from "../Models/Library";

require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_NAME = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

const CsillaDataSource = new DataSource({
	type: "mysql",
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USERNAME,
	password: DB_PASS,
	database: DB_NAME,
	extra: {
		ssl: false,
	},
	entities: [
		Users,
		Books,
		UserProgress,
		Divisions,
		LoginCount,
		TimeCount,
		Library,
	],
});

CsillaDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

export default CsillaDataSource;
