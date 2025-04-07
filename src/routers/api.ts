import express from "express";
import { router as factRouter } from "./factsRouters";

export const router = express.Router();

router.use("facts", factRouter)