import express from "express";
import NutritionController from "../controller/nutritionController.js";

const nutritionRoutes = express.Router();

nutritionRoutes.post("/create", NutritionController.createUserPlan);
nutritionRoutes.get("/get/:u_id", NutritionController.getUserPlan);
nutritionRoutes.put("/update/:nutr_id", NutritionController.updatePlan);
nutritionRoutes.get("/get/:u_id/:weekday", NutritionController.getByWeekday);

export default nutritionRoutes;
