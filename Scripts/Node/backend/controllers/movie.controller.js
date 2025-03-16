import { conn } from "../database/db.js";
import cloudinary from "../lib/cloudinary.js";

// Get all movies
export const getMovies = async (req, res) => {
    try {
        const [movies] = await conn.query("SELECT * FROM movies");
        res.status(200).json({ success: true, data: movies });
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const [movies] = await conn.query("SELECT * FROM movies WHERE MovieNo = ?", [id]);
        if (movies.length === 0) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({ success: true, data: movies[0] });
    } catch (error) {
        console.error("Error fetching movie:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const createMovies = async (req, res) => {
    try {
        const { Title, Language, Format, Genre, Length, Rating, AgeRating, Description, Director, Writer, Stars, TrailerURL } = req.body;
        
        const PosterURL = req.files?.poster ? req.files.poster[0].path : null;
        const MusicURL = req.files?.music ? req.files.music[0].path : null;

        const [result] = await conn.query(
            "INSERT INTO movies (Title, Language, Format, Genre, Length, Rating, AgeRating, Description, Director, Writer, Stars, MusicURL, TrailerURL, PosterURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Title, Language, Format, Genre, Length, Rating, AgeRating, Description, Director, Writer, Stars, MusicURL, TrailerURL, PosterURL]
        );

        res.status(201).json({ success: true, data: { MovieNo: result.insertId, ...req.body, PosterURL, MusicURL } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving movie" });
    }
};

export const updateMovies = async (req, res) => {
    const { id } = req.params;
    let updates = req.body;

    try {
        if (updates.Stars && Array.isArray(updates.Stars)) {
            updates.Stars = updates.Stars.join(", ");
        }

        if (updates.image) {
            const uploadResponse = await cloudinary.uploader.upload(updates.image, { folder: "movies/posters" });
            updates.PosterURL = uploadResponse.secure_url;
            delete updates.image;
        }

        if (updates.music) {
            const uploadMusic = await cloudinary.uploader.upload(updates.music, {
                resource_type: "raw",
                folder: "movies/music"
            });
            updates.MusicURL = uploadMusic.secure_url;
            delete updates.music;
        }

        const [result] = await conn.query("UPDATE movies SET ? WHERE MovieNo = ?", [updates, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({ success: true, message: "Movie updated successfully" });
    } catch (error) {
        console.error("Error updating movie:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteMovies = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await conn.query("DELETE FROM movies WHERE MovieNo = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        res.status(200).json({ success: true, message: "Movie deleted successfully" });
    } catch (error) {
        console.error("Error deleting movie:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
