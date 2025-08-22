import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary.js";
import { createMovies, deleteMovies, getMovies, updateMovies, getMovie } from "../controllers/movie.controller.js";

const router = express.Router();

// Setup Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "movies",
        resource_type: "auto"
    }
});
const upload = multer({ storage });

router.get("/", getMovies);
router.get("/:id", getMovie);

router.post("/", upload.fields([{ name: "poster" }, { name: "music" }]), createMovies);

router.put("/:id", upload.fields([{ name: "poster" }, { name: "music" }]), updateMovies);

router.delete("/:id", deleteMovies);

export default router;
