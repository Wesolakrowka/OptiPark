import Medication from "../model/medicationModel.js";

const err500 = "Erro Interno de Servidor";

const MedicationController = {
  getAllPrescriptions: async (req, res) => {
    try {
      const u_id = req.params.u_id;

      const prescriptions = await Medication.findAll({
        where: { u_id: u_id },
      });

      if (!prescriptions){
        return res.status(404).json({ error: "Utilizador não encontrado." });
      }

      res.status(200).json(prescriptions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createPrescription: async (req, res) => {
    try {
      const newPrescription = await Medication.create(req.body);
      res.status(201).json(newPrescription);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deletePrescription: async (req, res) => {
    try {
      const pills_id = req.params.id;
      const deletedRows = await Medication.destroy({
        where: { pills_id: pills_id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Prescrição não encontrada." });
      }

      res.status(200).json({ message: "Prescrição removida com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  
  requestPrescription: async (req, res) => {
    // Implementar lógica de solicitação de prescrição aqui
  },
  
  // Later
  sendPrescription: async (req, res) => {
    // Implementar lógica de envio de prescrição aqui
  },
};

export default MedicationController;