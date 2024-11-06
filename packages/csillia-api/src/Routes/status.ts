import { Router } from "express";
import axios from "axios"; 

require("dotenv").config();
const routes = Router();

routes.get("/", async (req, res) => {
  try {
      res.status(200).json('API is up!');
    } catch (error) {
      res.status(500).json('API is down!');
    }
});

export default routes;