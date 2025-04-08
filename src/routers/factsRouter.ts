import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { Fact } from "../models/fact";
import { User } from "../models/user";

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


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const facts = await Fact
            .findById(id)
            .populate<{ user: typeof User }>("user");

        if (!facts) {
            res.status(404).send("Fact not found");
            return;
        }

        res.json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Oops, something went wrong");
    }
});

router.put("/:id", authenticate, async (req, res): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, category, link } = req.body;

        const fact = await Fact.findById(id);
        
        if (!fact) {
            res.status(404).send("Fact not found");
            return;
        }

        fact.title = title || fact.title;
        fact.description = description || fact.description;
        fact.category = category || fact.category;
        fact.link = link || fact.link;

        await fact.save();

        res.json(fact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Oops, something went wrong while updating the fact.");
    }
});

router.delete("/:id", authenticate,);
