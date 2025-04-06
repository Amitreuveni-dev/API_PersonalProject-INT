import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
      password: {
        type: String,
        required: true,
      },
}, { timestamps: true });

export const User = model("user", userSchema);
