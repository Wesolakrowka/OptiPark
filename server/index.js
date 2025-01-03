import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import parkRouter from "./routes/parkRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Middleware CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/parks", parkRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
