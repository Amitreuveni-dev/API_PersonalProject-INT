import { Fact } from "../models/fact";
import { User } from "../models/user";

export const createFact = async (req: any, res: any) => {
    try {
        const userId = req.signedCookies.userId;    

        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { title, description, link, category } = req.body;

        const newFact = new Fact({
            title,
            description,
            link,
            category,
            userId,
        });

        await newFact.save();

        res.status(201).json(newFact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating fact" });
    }
};

