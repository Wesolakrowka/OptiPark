import Exams from "../model/examsModel.js";
import ExamCategorias from "../model/examsCatModel.js";
import sequelize from "../config/database.js";

const err500 = "Erro Interno de Servidor";

const ExamController = {
  getExams: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const exams = await Exams.findAll({
        where: { u_id: u_id },
        include: [
          {
            model: ExamCategorias,
            attributes: ["exam_cat_name"],
            required: false,
          },
        ],
        raw: true,
      });

      res.status(200).json(exams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getExamCategories: async (req, res) => {
    try {
      const categories = await ExamCategorias.findAll();

      const formattedCategories = categories.map(category => ({
        label: category.exam_cat_name,
        value: category.exam_cat_id,
      }));
  
      res.status(200).json(formattedCategories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createExam: async (req, res) => {
    try {
      const newExam = await Exams.create(req.body);
      res.status(201).json(newExam);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getLastThree: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const exams = await Exams.findAll({
        where: { u_id: u_id },
        include: [
          {
            model: ExamCategorias,
            attributes: ["exam_cat_name"],
            required: false,
          },
        ],
        raw: true,
        order: [["exam_id", "DESC"]],
        limit: 3,
      });

      res.status(200).json(exams);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ExamController;
