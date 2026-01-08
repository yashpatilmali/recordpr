import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fileRoutes from "./routes/fileRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

app.use("/api/files", fileRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
