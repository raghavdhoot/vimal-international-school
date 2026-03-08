import express from "express";
import { createServer as createViteServer } from "vite";
import { sql } from "@vercel/postgres";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

// Initialize database table (Postgres)
async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database table initialized (Postgres)");
  } catch (err) {
    console.error("Failed to initialize database table:", err);
  }
}

initDb();

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
  app.post(["/api/inquiry", "/api/inquiry/"], async (req, res) => {
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
      const result = await sql`
        INSERT INTO inquiries (
          student_name, dob, gender, grade, father_name, mother_name, contact_number, email, previous_school, last_grade
        ) VALUES (
          ${studentName}, ${dob}, ${gender}, ${grade}, ${fatherName}, ${motherName}, ${contactNumber}, ${email}, ${previousSchool}, ${lastGrade}
        ) RETURNING id
      `;

      const newId = result.rows[0].id;
      console.log(`New inquiry received: ID ${newId} for ${studentName}`);
      res.status(201).json({ success: true, id: newId });
    } catch (error) {
      console.error("Error saving inquiry:", error);
      res.status(500).json({ success: false, error: "Failed to save inquiry" });
    }
  });

  // Admin route to view inquiries (for the school)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const { rows } = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
      res.json(rows);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ success: false, error: "Failed to fetch inquiries" });
    }
  });

  // Admin route to delete an inquiry
  app.delete("/api/inquiries/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await sql`DELETE FROM inquiries WHERE id = ${id}`;
      
      if (result.rowCount > 0) {
        res.json({ success: true, message: "Inquiry deleted successfully" });
      } else {
        res.status(404).json({ success: false, error: "Inquiry not found" });
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      res.status(500).json({ success: false, error: "Failed to delete inquiry" });
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

  return app;
}

export default startServer();
