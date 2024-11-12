import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserLogin from "../models/user.js";
import config from "../config/index.js";

// Required for __dirname in ES modules
const server = express.Router();

const saltRounds = 10;
server.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Input validation
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!first_name) {
    return res.status(400).send("First name is required");
  }
  if (!last_name) {
    return res.status(400).send("Last name is required");
  }

  try {
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Creating new user...");
    const user = new UserLogin({
      first_name,
      last_name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    console.log("Saving user...");
    const savedUser = await user.save();
    return res.status(201).send({ user: savedUser._id });
  } catch (error) {
    console.log("Error during registration:", error);
  }
});


export default server;
