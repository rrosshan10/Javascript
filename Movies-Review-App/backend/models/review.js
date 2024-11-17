import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  rating: {
    type: mongoose.Schema.Types.Decimal128,
  },
  comment: {
    type: mongoose.Schema.Types.String,
  },
});
const review = mongoose.model("Review", reviewSchema, "review");

export default review;