import Park from "../model/parkModel.js";
import sequelize from "../config/database.js";
import "dotenv/config";

const err500 = "Internal Server Error";

const ParkController = {
  getAllParks: async (req, res) => {
    try {
      const parks = await Park.findAll();
      res.status(200).json(parks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  getParkById: async (req, res) => {
    const p_id = req.params.p_id;
    try {
      const park = await Park.findByPk(p_id);
      if (!park) {
        return res.status(404).json({ error: "Park not found" });
      }
      res.status(200).json(park);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  createPark: async (req, res) => {
    try {
      const {
        p_name,
        p_phone,
        p_website,
        p_price,
        p_location_score,
        p_parking_score,
        p_room_score,
        p_room_utilities_score,
        p_transport_score,
        p_canteen_score,
      } = req.body;

      if (!p_name || !p_phone || !p_website || p_price === undefined) {
        return res
          .status(400)
          .json({ error: "Name, Phone, Website, and Price are required" });
      }

      const newPark = await Park.create({
        p_name,
        p_phone,
        p_website,
        p_price,
        p_location_score,
        p_parking_score,
        p_room_score,
        p_room_utilities_score,
        p_transport_score,
        p_canteen_score,
      });

      res.status(201).json(newPark);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  updateParkById: async (req, res) => {
    const p_id = req.params.p_id;
    try {
      const [rowsUpdated] = await Park.update(req.body, {
        where: { p_id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        return res.status(404).json({ error: "Park not found" });
      }

      const updatedPark = await Park.findByPk(p_id);

      res.status(200).json(updatedPark);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },

  deletePark: async (req, res) => {
    const p_id = req.params.p_id;
    try {
      const deletedRows = await Park.destroy({
        where: { p_id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Park not found" });
      }

      res.status(200).json({ message: "Park deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err500 });
    }
  },
};

export default ParkController;
