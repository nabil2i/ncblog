import express, { RequestHandler } from "express";
import { getAPIStatus } from "../controllers/statusController.js";

const router = express.Router();

router.route('/')
  // get the status of the API
  .get(getAPIStatus);


  export default router;