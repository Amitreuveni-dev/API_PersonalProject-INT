import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { Fact } from "../models/fact";

export const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const facts = await Fact.find();
        res.json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Oops, something went wrong while fetching facts.");
    }
});

router.get("/:id",);

router.put("/:id", authenticate, async (req, res) => {  
   
});

router.delete("/:id", authenticate,);
