import express from "express";
import UserController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/login", UserController.loginUser);
const router = express.Router();
router.post("/register", UserController.registerUser);

export default userRoutes;
