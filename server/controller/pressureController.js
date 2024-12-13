import Pressure from "../model/pressureModel.js";

const err500 = "Erro Interno de Servidor";

const PressureController = {
  makePressionTest: async (req, res) => {
    try {
      const { u_id, press_sys, press_dia } = req.body;

      const newPressure = await Pressure.create({
        u_id,
        press_sys,
        press_dia,
      });

      return res.status(201).json(newPressure);
    } catch (error) {
      console.error("Erro ao criar pressão arterial:", error);
      return res.status(500).json({ error: err500 });
    }
  },

  getAllPressionTests: async (req, res) => {
    try {
      const { u_id } = req.params;
      const pressures = await Pressure.findAll({
        where: {
          u_id: u_id,
        },
      });

      res.status(200).json(pressures);
    } catch (error) {
      console.error("Erro ao buscar pressões arteriais:", error);
      res.status(500).json({ error: err500 });
    }
  },
};

export default PressureController;
