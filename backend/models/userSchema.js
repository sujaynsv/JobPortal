import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength:[3,"Name Must Contains atleast 3 characters"],
        maxLength:[50, "Name Must Not Contain 50 characters"]
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please Provide Email"]
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    domains:{
        firstDomain: String,
        secondDomain: String,
        thirdDomain: String,
    },
    password:{
        type: String,
        required: true,
        minLength: [8, "Password must contain atleast 8 characters"],
        maxLength: [30, "Password must not contain more that 30 characters"]
    },
    resume:{
        public_id: String,
        url: String
    },
    coverLetter:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["Job Seeker", "Employer"],
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", userSchema);