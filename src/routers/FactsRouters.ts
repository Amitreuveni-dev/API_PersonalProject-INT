import express from "express";

const router = express.Router();

router.get("/facts", (req, res) => {
    req.method, req.url;
    res.writeHead(201);
    res.end();
});