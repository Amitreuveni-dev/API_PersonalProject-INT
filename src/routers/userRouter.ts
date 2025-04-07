import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { User } from "../models/user";

export const router = express.Router();