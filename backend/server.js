import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import bcrypt from "bcrypt";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import jwt from "jsonwebtoken";

// Routes
import lifeInsuranceRoutes from "./routes/lifeInsurance.js";
import authRoutesFactory from "./routes/auth.js";
import policiesRoutesFactory from "./routes/policies.js";
import applicationsRoutesFactory from "./routes/applications.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -----------------------------------------------------
// ✅ CORS FIXED FOR DEPLOYED FRONTEND
// -----------------------------------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://insura-sphere.vercel.app", // deployed frontend
    ],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "devsecret123";

// ----------------------------------
// DATABASE (LowDB)
// ----------------------------------
const file = path.join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function initDB() {
  await db.read();

  db.data ||= {
    users: [],
    policies: [],
    applications: [],
    Insurance: [],
  };

  // Seed admin account (only once)
  const admin = db.data.users.find((u) => u.email === "admin@insura.com");
  if (!admin) {
    const hash = await bcrypt.hash("admin123", 10);
    db.data.users.push({
      id: "u_admin",
      name: "Admin",
      email: "admin@insura.com",
      passwordHash: hash,
      role: "admin",
    });
    await db.write();
  }
}

await initDB();

// ----------------------------------
// ROUTES
// ----------------------------------
app.use("/api/life-insurance", lifeInsuranceRoutes({ db }));
app.use("/api/auth", authRoutesFactory({ db, bcrypt, jwtSecret: JWT_SECRET }));
app.use("/api/policies", policiesRoutesFactory({ db, jwtSecret: JWT_SECRET }));
app.use(
  "/api/applications",
  applicationsRoutesFactory({ db, jwtSecret: JWT_SECRET })
);

// File upload
const upload = multer({ dest: path.join(__dirname, "uploads/") });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded", file: req.file });
});

app.get("/", (req, res) =>
  res.send("InsuraSphere backend running successfully")
);

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
