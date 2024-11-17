import mongoose from "mongoose";
import config from "./index.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.URI); // MongoDB connection
    console.log("Connected to database", config.URI);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectToDatabase;