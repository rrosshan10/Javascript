import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import config from "./config/index.js";
import authRoutes from "./routes/authUser.js";
import userRoutes from "./routes/userRoutes.js";
import moviesRoutes from "./routes/moviesRoute.js";
import connectToDatabase from "./config/db.js";
import verifyToken from "./middleware/authMiddleWare.js";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Log HTTP requests

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

connectToDatabase(); //set connection to database

// Routes
app.use("/auth", authRoutes); // Authentication routes (e.g., login, register)
//app.use("/movies", movieRoutes); // Movie-related routes
//app.use("/reviews", reviewRoutes); // Review-related routes
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Return an empty response (no content)
});

// Define the routes to render the view

app.use(verifyToken);

app.use("/api", userRoutes);

app.use("/api", moviesRoutes);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
