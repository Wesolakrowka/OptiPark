import express from "express";
import UserController from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
