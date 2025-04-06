import express from "express";

export const router = express.Router();

router.get("/facts", (_, res) => {
    res.json({ message: "Hello World!" });
});
