import express from "express";
import MedicationController from "../controller/medicationController.js";

const medicationRouter = express.Router();

medicationRouter.get("/getall/:u_id", MedicationController.getAllPrescriptions);
medicationRouter.post("/create", MedicationController.createPrescription);
medicationRouter.delete("/delete/:id", MedicationController.deletePrescription);
medicationRouter.get(
  "/download/file/:id",
  MedicationController.requestPrescription
);
medicationRouter.post(
  "/upload/file/:id",
  MedicationController.sendPrescription
);

export default medicationRouter;
