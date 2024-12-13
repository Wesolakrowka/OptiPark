import Objectives from "../model/objectiveModel.js";

const err500 = "Erro Interno do Servidor";

const ObjectivesController = {
  createObjective: async (req, res) => {
    try {
      const newObjective = await Objectives.create(req.body);

      res.status(201).json(newObjective);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getObjectives: async (req, res) => {
    try {
      const u_id = req.params.u_id;
      const objectives = await Objectives.findAll({
        where: { u_id: u_id },
      });

      res.status(200).json(objectives);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deleteObjective: async (req, res) => {
    const obj_id = req.params.id;
    try {
      const deletedRows = await Objectives.destroy({
        where: { obj_id: obj_id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: "Objetivo não encontrado" });
      }
      res.status(200).json({ message: "Objetivo removido com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getLastThree: async (req, res) => {
    try {
      const u_id = req.params.u_id;
      const objectives = await Objectives.findAll({
        where: { u_id: u_id },
        order: [["obj_id", "DESC"]],
        limit: 3,
        raw: true,
      });

      res.status(200).json(objectives);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ObjectivesController;
