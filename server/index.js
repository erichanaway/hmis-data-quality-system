import { runRules } from "./rules/index.js";
import { mapRow } from "./mappers/fakeMapper.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import multer from "multer";
import xlsx from "xlsx";
dotenv.config();

const app = express();

const upload = multer({
    dest: "uploads/"
});

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

app.get("/api/flags", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM flags;"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to retrieve flags."
        });
    }
});

app.post("/api/upload", upload.single("file"), (req,res) => {
    
    const workbook = xlsx.readFile(req.file.path);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const rows = xlsx.utils.sheet_to_json(worksheet);

    const mappedRows = rows.map(mapRow);

    const flags = runRules(mappedRows);

    console.log(flags);

    res.json({
        message: "upload route works!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});