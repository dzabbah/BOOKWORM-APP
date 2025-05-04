import express from "express";
import cors from "cors"
import "dotenv/config";
import job from "./lib/cron.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

import {connectDB} from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Autoriser toutes les origines (pour développement uniquement)
app.use(cors());

// Ou mieux : autoriser explicitement localhost:8081
// app.use(cors({ origin: "http://localhost:8081" }));
job.start();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.post("/api/books",bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});