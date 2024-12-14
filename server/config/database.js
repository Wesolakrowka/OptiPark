import { Sequelize } from 'sequelize';
import express from "express";
import userRoutes from "../routes/userRoutes.js";

// Jeśli masz hasło, wprowadź je zamiast pustego ciągu.
const sequelize = new Sequelize('optipark', 'root', '13554', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // domyślny port MySQL
    logging: false // wyłącza logowanie zapytań do konsoli, jeśli nie chcesz tego widzieć
});

sequelize.authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));

export default sequelize;
