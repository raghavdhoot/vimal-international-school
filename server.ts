import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

const dbPath = process.env.SQLITE_DB_PATH || process.env.DATABASE_URL || path.join(__dirname, "inquiries.db");
console.log(`Using database path: ${dbPath}`);

// Ensure the directory for the database exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating database directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

let db: Database.Database;
try {
  db = new Database(dbPath);
  console.log(`Connected to database at: ${dbPath}`);
} catch (err) {
  console.error("Failed to connect to database:", err);
  process.exit(1);
}

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT,
    dob TEXT,
    gender TEXT,
    grade TEXT,
    father_name TEXT,
    mother_name TEXT,
    contact_number TEXT,
    email TEXT,
    previous_school TEXT,
    last_grade TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors());
  app.use(express.json());

  // Request logger
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // API Route for form submission
  app.post(["/api/inquiry", "/api/inquiry/"], (req, res) => {
    const {
      studentName,
      dob,
      gender,
      grade,
      fatherName,
      motherName,
      contactNumber,
      email,
      previousSchool,
      lastGrade
    } = req.body;

    console.log("Received inquiry submission:", req.body);
    try {
      const stmt = db.prepare(`
        INSERT INTO inquiries (
          student_name, dob, gender, grade, father_name, mother_name, contact_number, email, previous_school, last_grade
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        studentName,
        dob,
        gender,
        grade,
        fatherName,
        motherName,
        contactNumber,
        email,
        previousSchool,
        lastGrade
      );

      console.log(`New inquiry received: ID ${info.lastInsertRowid} for ${studentName}`);
      res.status(201).json({ success: true, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Error saving inquiry:", error);
      res.status(500).json({ success: false, error: "Failed to save inquiry" });
    }
  });

  // Admin route to view inquiries (for the school)
  app.get("/api/inquiries", (req, res) => {
    try {
      const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch inquiries" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
