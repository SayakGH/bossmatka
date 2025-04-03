import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import userRouts from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

// Define routes
app.use("/", authRoutes);
app.use("/user", bankRoutes);
app.use("/usergames", userRouts);

//conect to database
sequelize
  .sync({ alter: true }) // Creates or updates table if necessary
  .then(() => console.log("✅ Database synchronized"))
  .catch((err) => console.error("❌ Sync error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});