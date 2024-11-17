import express from "express";
import UserLogin from "../models/user.js";
import verifyToken from "../middleware/authMiddleWare.js";

const router = express.Router();

router.use(verifyToken);

router.get("/users", async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await UserLogin.find({}, "-password"); // Exclude the password field
      res.status(200).json(users); // Respond with the list of users
    } catch (error) {
      res.status(500).send("Error fetching users: " + error.message);
    }
  });

  export default router;