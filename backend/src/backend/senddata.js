import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import cloudinary from "cloudinary";

// Get `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure MySQL connection
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Define paths for assets
const IMAGE_FOLDER = path.join(__dirname, "../../../MovieBanner"); // Images
const MUSIC_FOLDER = path.join(__dirname, "../../../Musics"); // Music
const JSON_FILE = path.join(__dirname, "movies.json"); // JSON file

// Function to upload files to Cloudinary
const uploadToCloudinary = async (filePath, folder, resourceType = "image") => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return null;
    }

    const options = { folder };
    if (resourceType === "video") {
      options.resource_type = "video";
    }

    const result = await cloudinary.v2.uploader.upload(filePath, options);
    return result.secure_url; // Return Cloudinary URL
  } catch (error) {
    console.error(`Cloudinary upload failed for ${filePath}:`, error);
    return null;
  }
};

// Function to process and upload movies
const processMovies = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to database");

    const movies = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

    for (const movie of movies) {
      console.log(`Processing: ${movie.name}`);

      // Upload movie poster
      const imagePath = path.join(IMAGE_FOLDER, movie.image_loc);
      const posterURL = await uploadToCloudinary(imagePath, "movies/posters");

      // Upload movie music (if available)
      let musicURL = null;
      if (movie.music) {
        const musicPath = path.join(MUSIC_FOLDER, movie.music);
        if (fs.existsSync(musicPath)) {
          musicURL = await uploadToCloudinary(musicPath, "movies/music", "video");
        } else {
          console.warn(`Music file not found: ${musicPath}`);
        }
      }

      // Insert data into MySQL
      const sql = `
        INSERT INTO movies (Title, Language, Format, Genre, Length, Rating, AgeRating, Description, 
          Director, Writer, Stars, MusicURL, TrailerURL, PosterURL)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        movie.name,
        movie.language,
        movie.format,
        movie.genre,
        movie.length,
        movie.imdb_rating,
        movie.age_rating,
        movie.story,
        movie.director,
        movie.writer,
        movie.stars.join(", "),
        musicURL,
        movie.trailer,
        posterURL,
      ];

      await connection.execute(sql, values);
      console.log(`Inserted: ${movie.name}`);
    }

    await connection.end();
    console.log("All movies inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Run the script
processMovies();
