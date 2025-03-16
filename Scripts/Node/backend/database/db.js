import mysql from "mysql2/promise"; // ✅ Use the Promise version
import dotenv from "dotenv";

dotenv.config();

// ✅ Use `createPool` instead of `createConnection` for better performance
const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // ✅ Adjust based on your needs
    queueLimit: 0,
    multipleStatements: true
});

// ✅ Asynchronous Database Connection Test
const connectDB = async () => {
    try {
        const connection = await conn.getConnection();
        console.log("✅ Connected to MySQL database!");
        connection.release(); // ✅ Release the connection back to the pool
    } catch (err) {
        console.error("❌ Connection failed:", err.message);
        process.exit(1); // Exit if connection fails
    }
};

export { connectDB, conn };
