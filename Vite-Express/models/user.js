import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, "Your firstname is required"],
            minlength: 2,
            maxlength: 25,
        },
        last_name: {
            type: String,
            required: [true, "Your lastname is required"],
            minlength: 2,
            maxlength: 25,
        },
        email: {
            type: String,
            required: [true, "Your email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
            minlength: 6,  // Recommended minimum length
            maxlength: 500,
        },
    },
    { timestamps: true }
);

const UserLogin = mongoose.model("UserLogin", UserSchema, "user_login");

export default UserLogin;
