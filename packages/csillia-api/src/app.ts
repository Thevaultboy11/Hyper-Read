import express from "express";
import api from "./Routes/index";
import morgan from "morgan";
import cors from "cors";
import * as helmet from "helmet";
import cookieParser from "cookie-parser";
import sessions from "cookie-session";

require("dotenv").config();
const bodyParser = require("body-parser");

const ORIGIN = process.env.ORIGIN;
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.JWT_SECRET;
class App {
  public server;

  constructor() {
    this.server = express();

    // trust ingress controler
    this.server.enable("trust proxy", 1);

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(function (req, res, next) {
      res.header("X-Powered-By", "Csillia's Backend Team");
      next();
    });

    if (NODE_ENV === "production") {
      this.server.use(cors({ origin: ORIGIN }));
    } else {
      this.server.use(
        cors({
          origin: process.env.ORIGIN,
          credentials: true,
          methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
        })
      );
    }

    this.server.use(morgan("combined"));
    this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cookieParser());

    //sessions
    this.server.use(
      sessions({
        name: "session",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 60 * 60 * 24 * 1000,
        },
      })
    );

    //helmet block
    this.server.use(helmet.contentSecurityPolicy());
    this.server.use(helmet.dnsPrefetchControl());
    this.server.use(helmet.expectCt());
    this.server.use(helmet.frameguard());
    this.server.use(helmet.hsts());
    this.server.use(helmet.ieNoOpen());
    this.server.use(helmet.noSniff());
    this.server.use(helmet.originAgentCluster());
    this.server.use(helmet.permittedCrossDomainPolicies());
    this.server.use(helmet.referrerPolicy());
    this.server.use(helmet.xssFilter());
  }

  routes() {
    api(this.server);
  }
}

export default new App().server;
