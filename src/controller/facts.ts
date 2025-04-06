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

export const getFacts = async (res: any) => {
    try {
        const facts = await Fact.find();
        res.status(200).json(facts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching facts" });
    }
};

export const updateFact = async (req: any, res: any) => {
    try {
        const userId = req.signedCookies.userId;

        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const fact = await Fact.findById(req.params.id);

        if (!fact) {
            return res.status(404).json({ error: "Fact not found" });
        }

        if (fact.userId.toString() !== userId) {
            return res.status(403).json({ error: "You can only update your own facts" });
        }

        const { title, description, link, category } = req.body;

        fact.title = title || fact.title;
        fact.description = description || fact.description;
        fact.link = link || fact.link;
        fact.category = category || fact.category;

        await fact.save();

        res.status(200).json(fact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating fact" });
    }
};
