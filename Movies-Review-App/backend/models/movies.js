import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
  // _id is automatically added by MongoDB, no need to explicitly define it

  id: {
    type: mongoose.Schema.Types.Number,
    unique: true,
    required: true,
    autoIncrement: true
  },

  title: {
    type: mongoose.Schema.Types.String, // Use String for the movie title
    required: true,
  },

  genre: {
    type: mongoose.Schema.Types.String, // Genre of the movie as a string
    required: true,
  },

  release_date: {
    type: mongoose.Schema.Types.Date, // Store the release date as a Date object
    required: true,
  },

  director: {
    type: mongoose.Schema.Types.String, // Director's name as a string
    required: true,
  },

  actors: {
    type: [mongoose.Schema.Types.String], // Array of strings for actors
    required: true,
  },

  rating: {
    type: mongoose.Schema.Types.Number, // Rating as a number
    min: 0, // Minimum rating (for example, 0-5 scale)
    max: 5, // Maximum rating
    required: true,
  },

  duration_minutes: {
    type: mongoose.Schema.Types.Number, // Duration in minutes as a number
    required: true,
  },

  budget: {
    type: mongoose.Schema.Types.String, // Budget stored as a string (could include currency code)
    required: true,
  },

  box_office: {
    type: mongoose.Schema.Types.String, // Box office earnings as a string (could include currency code)
    required: true,
  },

  production_company: {
    type: mongoose.Schema.Types.String, // Production company name as a string
    required: true,
  },

  movie_poster_url: {
    type: mongoose.Schema.Types.String, // URL of the movie poster
    required: true,
  },
});

const movies = mongoose.model("Movies", moviesSchema, "movies");

export default movies;
