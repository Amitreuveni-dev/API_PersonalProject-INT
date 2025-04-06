import { model, Schema } from "mongoose";

const schemaCategory = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
});

export const Category = model("category", schemaCategory);