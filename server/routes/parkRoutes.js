import express from "express";
import ParkController from "../controller/parkController.js";

const parkRouter = express.Router();

// get all parks
parkRouter.get("/", ParkController.getAllParks);

// get park
parkRouter.get("/:p_id", ParkController.getParkById);

// Create park
parkRouter.post("/", ParkController.createPark);

// Update by id
parkRouter.put("/:p_id", ParkController.updateParkById);

// Delete by id
parkRouter.delete("/:p_id", ParkController.deletePark);

export default parkRouter;
