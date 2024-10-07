import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

// @desc API Status 
// @route GET /apiStatus
// @access Public Guest
export const getAPIStatus = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "API up and running"});
};

