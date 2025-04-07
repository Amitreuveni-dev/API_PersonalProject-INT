import { Handler } from "express";

export const authenticate: Handler = (req, res, next) => {
    const userId = req.signedCookies.userId;
    if (!userId) {
        return res.status(401).redirect("/login");
    }
    next();
};
