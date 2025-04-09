import express from "express";
import { router as factsRouter } from "./factsRouter";
import { router as usersRouter } from "./usersRouter";

export const router = express.Router();

router.use("/facts", factsRouter)
router.use("/user", usersRouter);