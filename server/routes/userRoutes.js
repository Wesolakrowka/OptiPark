import express from "express";
import UserController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/getall", authMiddleware, UserController.getAllUsers);
userRoutes.get("/getbyid/:u_id", authMiddleware, UserController.getUserById);
userRoutes.get("/getdocs", authMiddleware, UserController.getDoctors);
userRoutes.get("/getuser/:u_nome?", authMiddleware, UserController.getUserByName);
userRoutes.post("/create", UserController.createUser);
userRoutes.put("/update/:u_id", authMiddleware, UserController.updateUserById);
userRoutes.delete("/delete/:u_id", authMiddleware, UserController.deleteUser);
userRoutes.post("/login", UserController.loginUser); 

export default userRoutes;
