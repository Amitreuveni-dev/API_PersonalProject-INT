import express from "express";
import { createFact, getFacts, updateFact, deleteFact } from "../controller/facts";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

router.post("/fact", authenticate, createFact);

router.get("/facts", getFacts);

router.put("/fact/:id", authenticate, updateFact);

router.delete("/fact/:id", authenticate, deleteFact);
