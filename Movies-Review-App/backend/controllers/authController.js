// routes/authRoutes.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserLogin from "../models/user.js";
import config from "../config/index.js";
import validator from "validator";
import redisClient from "../config/redis.js";

const router = express.Router();

const saltRounds = 10;
// Register
export const registerUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Password validation (using regex for all checks in one line)

  try {
    const existingUser = await UserLogin.findOne({
      email: email.trim().toLowerCase(),
    });
    try {
      if (existingUser) {
        return res.status(400).send("Email is already registered.");
      }
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error (e.g., email)
        return res.status(400).send("Email already exists");
      }
      return res.status(500).send("Server error");
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const user = new UserLogin({
      first_name,
      last_name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();
    return res.status(201).send({ user: savedUser._id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user: " + error.message);
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await UserLogin.findOne({ email });
    if (!user) return res.status(400).send("Email is incorrect");

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Password is incorrect");

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};

export const logoutUser = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get the token from Authorization header

  if (!token) {
    return res.status(400).send("No token provided");
  }

  try {
    // Add the token to the Redis blacklist with an expiration time
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the token to the blacklist (set with an expiration time equal to token's expiry time)
    await redisClient.set(
      `blacklist_${token}`,
      "true",
      "EX",
      decoded.exp - Math.floor(Date.now() / 1000)
    ); // expires when the token expires

    // Optionally, you can also clear the session or perform other cleanup actions.

    return res.status(200).send("Logged out successfully");
  } catch (error) {
    return res.status(500).send("Error logging out");
  }
};

export default router;
