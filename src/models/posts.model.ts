import { Schema, model } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
}, { timestamps: true });

export const Facts = model("Post", schema);
