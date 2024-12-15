import express from "express";
import UserController from "../controller/userController.js";

const userRoutes = express.Router();

// Trasa logowania
userRoutes.post("/login", UserController.loginUser);

// Trasa rejestracji
userRoutes.post("/register", UserController.registerUser);

export default userRoutes;
