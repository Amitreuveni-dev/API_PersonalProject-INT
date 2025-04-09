import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { User } from "../models/users";

export const router = express.Router();