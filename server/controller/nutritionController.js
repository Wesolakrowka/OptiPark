import Nutrition from "../model/nutritionModel.js";

const err500 = "Erro Interno de Servidor";

const NutritionController = {
  createUserPlan: async (req, res) => {
    try {
      const newPlan = await Nutrition.create(req.body);
      res.status(201).json(newPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getUserPlan: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const userPlan = await Nutrition.findAll({
        where: { u_id: u_id },
      });

      res.status(200).json(userPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updatePlan: async (req, res) => {
    try {
      const nutr_id = req.params.nutr_id;

      const updateData = { ...req.body, updatedAt: new Date() };

      const [rowsUpdated] = await Nutrition.update(updateData, {
        where: { nutr_id: nutr_id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Plano não encontrado" });
      }

      const updatedNutrition = await Nutrition.findByPk(nutr_id);

      res.status(200).json(updatedNutrition);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
  getByWeekday: async (req, res) => {
    try {
      const { u_id, weekday } = req.params;

      const weekdayPlan = await Nutrition.findAll({
        where: { u_id: u_id, weekday: weekday },
      });

      res.status(200).json(weekdayPlan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default NutritionController;
