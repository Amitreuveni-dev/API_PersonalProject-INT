import express from "express";
import { authenticate } from "../middlewares/authenticate";
import { Fact } from "../models/fact";
import { User } from "../models/user";
import { error } from "console";

export const router = express.Router();

router.get("/", async (_, res) => {
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

router.post("/", authenticate, async (req, res) => {
    try {
        const { title, description, link, category } = req.body;
        const { userId } = req.signedCookies;

        if (!title || !description || !link || !category) {
            res.status(400).send("All fields are required");
            return;
        }

        const newFact = new Fact({
            title,
            description,
            link,
            category,
            user: userId,
        });

        await newFact.save();
        res.status(201).json(newFact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error while creating the fact");
    }
});

router.put("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.signedCookies;
        const updatedData = req.body;

        const updatedFact = await Fact.findOneAndReplace(
            { _id: id },
            { ...updatedData, user: userId },
            { upsert: true }
        );

        res.status(200).json(updatedFact);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong while updating the fact.");
    }
});

router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        await Fact.findOneAndDelete({_id: id});

        res.status(204);
        res.end();
    } catch (error){
        console.error(error);
        res.status(500).send("Error, Something went wrong");
    }
});
