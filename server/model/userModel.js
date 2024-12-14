import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  u_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  u_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  u_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
