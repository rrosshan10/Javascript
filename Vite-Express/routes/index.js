import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserLogin from "../models/user.js";
import config from "../config/index.js";

const server = express.Router();
const saltRounds = 10;

// Enforce unique index once on server startup
(async function enforceUniqueEmailIndex() {
  try {
    console.log("Dropping email index if it exists...");
    await UserLogin.collection.dropIndex("email_1");
  } catch (error) {
    if (error.code === 27) {
      console.log("Index does not exist, no need to drop.");
    } else {
      console.error("Error dropping index:", error);
    }
  }

  try {
    await UserLogin.createIndexes();
    console.log("Unique email index ensured.");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
})();

server.post("/register", async (req, res) => {
  console.log("Register endpoint called");
  const { first_name, last_name, email, password } = req.body;

  // Input validation
  if (!password) return res.status(400).send("Password is required");
  if (!email) return res.status(400).send("Email is required");
  if (!first_name) return res.status(400).send("First name is required");
  if (!last_name) return res.status(400).send("Last name is required");

  try {
    // Check for existing user and handle atomicity with upsert
    const existingUser = await UserLogin.findOne({ email });
    if (existingUser) return res.status(400).send("Email is already registered");

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Creating new user...");
    const user = new UserLogin({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    console.log("Saving user...");
    await user.save();
    return res.status(201).send({ user: user._id });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error code
      return res.status(400).send("Email is already registered.");
    }
    console.log("Error during registration:", error);
    return res.status(500).send("Server error during registration");
  }
});

export default server;
