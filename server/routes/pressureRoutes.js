import express from "express";
import PressureController from "../controller/pressureController.js";

const pressureRoutes = express.Router();

pressureRoutes.post("/make", PressureController.makePressionTest);
pressureRoutes.get("/get/:u_id", PressureController.getAllPressionTests);

export default pressureRoutes;
