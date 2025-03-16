import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js";
import movieRoutes from "./routes/movie.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Movie Routes (Handles File Uploads Inside `movies.routes.js`)
app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Running on http://localhost:${PORT}`);
});