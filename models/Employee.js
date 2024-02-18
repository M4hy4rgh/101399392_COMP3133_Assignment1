// import { Schema, model } from "mongoose";
const { Schema, model } = require("mongoose");

const employeeSchema = new Schema({
    first_name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        minlength: 3,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other",
    },
    salary: {
        type: Number,
        required: true,
    },
},
{
    timestamps: true,
});

const Employee = model("Employee", employeeSchema);

module.exports = Employee;