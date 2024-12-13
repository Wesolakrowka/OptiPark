import express from "express";
import ExamController from "../controller/examController.js";

const examRoutes = express.Router();

examRoutes.get("/get/:u_id", ExamController.getExams);
examRoutes.post("/create", ExamController.createExam);
examRoutes.get("/lasthree/:u_id", ExamController.getLastThree);
examRoutes.get("/getcategories", ExamController.getExamCategories);
export default examRoutes;
