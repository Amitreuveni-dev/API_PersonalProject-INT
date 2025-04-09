import { model, Schema, Types } from "mongoose";


const factSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "All",
        required: true,
    },
    link: {
        type: String,
        required: true,
        // match: [/^(https?:\/\/)?([\w\d\-_]+\.){1,}[\w\d\-_]+(\/[\w\d\-_]+)*\/?$/, "Please provide a valid URL"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Fact = model("Fact", factSchema);
