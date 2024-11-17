import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Your firstname is required"],
            min:2,
            max: 25,
        },
        last_name: {
            type: String,
            required: [true, "Your lastname is required"],
            min:2,
            max: 25,
        },
        email: {
            type: String,
            required: [true, "Your email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
            min: 8,
            max: 25,
        },
    },
    { timestamps: true }
);

const UserLogin = mongoose.model("UserLogin", UserSchema, "user_login");

export default UserLogin;