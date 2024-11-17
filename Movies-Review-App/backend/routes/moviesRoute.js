import express from "express";
import Movies from "../models/movies.js";
import verifyToken from "../middleware/authMiddleWare.js";

const router = express.Router();

router.use(verifyToken);

router.get("/movies", async (req, res) => {
    try{
        const movies = await Movies.find();
        res.status(200).json(movies);
    }catch (error) {
        res.status(500).send("Error fetching movies: " + error.message);
    }
});

export default router;