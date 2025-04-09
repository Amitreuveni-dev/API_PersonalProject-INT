import path from "path";
import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { router as apiRouter } from "./routers/api";
import { User } from "./models/user";

export const app = express();

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.use(json());
app.use(cookieParser(process.env.SESSION_SECRET));

app.all("/login", (req, res, next) => {
    if (req.signedCookies.userId) {
        res.redirect("/");
        return;
    }

    next();
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        res.status(401).send("Wrong credentials");
        return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("userId", user._id.toString(), {
        expires,
        signed: true,
        httpOnly: true,
    });

    res.status(200).send("Logged in successfully");
});

app.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const createdUser = await User.create({
            email,
            password,
            name,
        });

        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("userId", createdUser._id, {
            expires,
            signed: true,
            httpOnly: true,
            path: "/",
        });

        res.status(201).json(createdUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Oops, something went wrong during registration.");
    }
});

app.use("/api", apiRouter);
app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use((_, res) => {
    res.status(404).sendFile(path.resolve(__dirname, "..", "public", "404.html"));
});
