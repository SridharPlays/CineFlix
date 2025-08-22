import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;
const textFilePath = "booking_logging.txt";

app.use(express.json());
app.use(cors());

app.post("/api/booking-info", (req, res) => {
    const { movieName, language, price } = req.body;

    if (!movieName || !language || !price) {
        return res.status(400).json({ message: "All Fields Required!" });
    }

    const currentTime = new Date().toISOString();
    const movieData = `Movie: ${movieName} \nLanguage: ${language} \nTotal: ${price} \nBooked At: ${currentTime} \n-----------------------\n\n`;

    fs.appendFile(textFilePath, movieData, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        console.log("Movie data logged successfully!");
        return res.status(200).json({ message: "Received Successfully" });
    });
});

// Start Server
app.listen(PORT, () => {
    fs.writeFile(textFilePath, "", { flag: "w" }, (err) => {
        if (err) {
            console.error("Error creating log file:", err);
            process.exit(1);
        }
        console.log("Log file initialized successfully.");
    });

    console.log(`Server Started at http://localhost:${PORT}`);
});
