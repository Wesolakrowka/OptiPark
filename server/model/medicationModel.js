import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

import User from "./userModel.js";

const Medication = sequelize.define(
  "Medication",
  {
    pills_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
      unique: true,
    },
    u_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "u_id",
        as: "patient_id",
      },
    },
    u_doc_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "u_id",
        as: "doc_id",
      },
    },
    pills_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pills_userrequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "medicacao",
  }
);

Medication.belongsTo(User, { foreignKey: "u_id", as: "patient_id" });
Medication.belongsTo(User, { foreignKey: "u_doc_id", as: "doc_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Medication;
