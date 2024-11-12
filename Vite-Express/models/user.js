import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: "Your firstname is required",
            min:2,
            max: 25,
        },
        last_name: {
            type: String,
            required: "Your lastname is required",
            min:2,
            max: 25,
        },
        email: {
            type: String,
            required: "Your email is required",
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: "Your password is required",
            max: 25,
        },
    },
    { timestamps: true }
);

const UserLogin = mongoose.model("UserLogin", UserSchema, "user_login");

export default UserLogin;