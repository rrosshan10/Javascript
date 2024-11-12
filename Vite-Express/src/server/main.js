import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from "../../config/index.js";
import router from "../../routes/index.js"; // Import router here
import { fileURLToPath } from "url";
import UserLogin from "../../models/user.js";

const server = express();

// Middleware configuration
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set up EJS view engine and views path
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "../client/views"));  // Set views directory

// Serve static files from the 'client' folder
server.use(express.static(path.join(__dirname, "../client")));

// Use the router for handling routes
server.use(router); // Use router middleware


/*server.get('/users', async (req, res) => {
  try {
    console.log('Attempting to fetch users...');
    const users = await UserLogin.find();  // Fetch all users
    console.log('Users retrieved:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error during the fetch process:", error);
    res.status(500).send("Error fetching users");
  }
});*/

// Check if email already exists
server.get("/check-email", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const existingEmail = await UserLogin.findOne({ email: email.trim().toLowerCase() });
    
    // Return a JSON response indicating whether the email exists
    if (existingEmail) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return res.status(500).send("Error checking email");
  }
});



server.get("/", (req, res) => {
  try {
      res.render("index"); // Renders views/index.ejs
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});

// Render the login page using EJS
server.get("/login", (req, res) => {
  try {
      res.render("login"); // Renders views/login.ejs
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});


server.get("/movies", (req, res) => {
  try {
      res.render("movies"); // Renders views/login.ejs
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});
server.get("/services", (req, res) => {
  try {
      res.render("services"); // Renders views/login.ejs
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});
server.get("/about", (req, res) => {
  try {
      res.render("about"); // Renders views/login.ejs
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});
// MongoDB connection
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

async function connectToDatabase() {
  try {
    await mongoose.connect(config.URI); // MongoDB connection
    console.log("Connected to database", config.URI);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectToDatabase();

// Start the server
server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});
