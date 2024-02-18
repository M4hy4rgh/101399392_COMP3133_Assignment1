// import { Schema, model } from "mongoose";
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;