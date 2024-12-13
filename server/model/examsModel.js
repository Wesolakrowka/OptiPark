import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";
import ExamCategorias from "./examsCatModel.js";

const Exams = sequelize.define(
  "Exams",
  {
    exam_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    u_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "u_id",
      },
    },
    exam_cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ExamCategorias,
        key: "exam_cat_id",
      },
    },
    exam_desct: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    exam_file: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: true,
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
    tableName: "exames",
  }
);

Exams.belongsTo(User, { foreignKey: "u_id" });
Exams.belongsTo(ExamCategorias, { foreignKey: "exam_cat_id" });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database and tables have been synchronized.");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Exams;
