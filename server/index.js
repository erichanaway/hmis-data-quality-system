import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test PostgreSQL connection

async function connectDatabase() {
    try {
        const result = await pool.query("SELECT NOW();");
        console.log("✅ Connected to PostgreSQL");
        console.log("Database time:", result.rows[0].now);
    } catch (error) {
        console.error("❌ Database connection failed");
        console.error(error);
    }
}

connectDatabase();

app.get("/", (req, res) => {
    res.json({
        message: "HMIS Data Quality API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});