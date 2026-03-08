import express from "express";
import { sql } from "@vercel/postgres";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`VERCEL: ${process.env.VERCEL}`);

let dbInitialized = false;

// Initialize database table (Postgres)
async function initDb() {
  if (dbInitialized) return { success: true, message: "Already initialized" };
  
  if (!process.env.POSTGRES_URL) {
    console.error("POSTGRES_URL is missing!");
    return { success: false, error: "POSTGRES_URL environment variable is missing. Please connect your database in Vercel Storage tab." };
  }

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
    await sql`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        student_name TEXT,
        gr_number TEXT,
        document_type TEXT,
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database table initialized (Postgres)");
    dbInitialized = true;
    return { success: true, message: "Database table initialized successfully" };
  } catch (err: any) {
    console.error("Failed to initialize database table:", err);
    return { success: false, error: err.message || "Unknown database error" };
  }
}

// Call initDb on startup (non-blocking)
initDb().catch(console.error);

const app = express();

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root API route
app.get("/api", (req, res) => {
  res.json({ 
    message: "Vimal International School API",
    status: "online",
    time: new Date().toISOString()
  });
});

// Manual init route
app.get("/api/init-db", async (req, res) => {
  const result = await initDb();
  if (result.success) {
    res.json({ 
      success: true, 
      message: result.message,
      env: {
        hasUrl: !!process.env.POSTGRES_URL,
        nodeEnv: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL
      }
    });
  } else {
    res.status(500).json({ 
      success: false, 
      message: "Failed to initialize database",
      error: result.error
    });
  }
});

// API Route for certificate request
app.post("/api/certificate", async (req, res) => {
  await initDb();
  const { student_name, gr_number, document_type, reason } = req.body;
  
  if (!student_name || !gr_number || !document_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await sql`
      INSERT INTO certificates (student_name, gr_number, document_type, reason)
      VALUES (${student_name}, ${gr_number}, ${document_type}, ${reason})
      RETURNING *
    `;
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error("Error saving certificate request:", err);
    res.status(500).json({ error: "Failed to save request", details: err.message });
  }
});

// GET all certificate requests (Admin)
app.get("/api/certificates", async (req, res) => {
  await initDb();
  try {
    const result = await sql`SELECT * FROM certificates ORDER BY created_at DESC`;
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch certificate requests" });
  }
});

// DELETE certificate request
app.delete("/api/certificate/:id", async (req, res) => {
  await initDb();
  const { id } = req.params;
  try {
    await sql`DELETE FROM certificates WHERE id = ${id}`;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete request" });
  }
});

// API Route for form submission
app.post(["/api/inquiry", "/api/inquiry/"], async (req, res) => {
  // Ensure DB is initialized before processing
  await initDb();
  
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

// Catch-all for other API routes
app.all("/api/*", (req, res) => {
  res.status(404).json({ 
    error: "API Route Not Found", 
    path: req.path, 
    method: req.method 
  });
});

async function startServer() {
  // Only run Vite and listen to a port if we are NOT on Vercel
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
