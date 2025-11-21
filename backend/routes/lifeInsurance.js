import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export default function lifeInsuranceRoutes({ db }) {
  const router = express.Router();

  // Create upload folder
  const uploadDir = "uploads/life-insurance";
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  // Multer config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });

  const upload = multer({ storage });

  // ============================
  // 📌 APPLY FOR LIFE INSURANCE
  // ============================
  router.post(
    "/apply",
    upload.fields([
      { name: "idProof", maxCount: 1 },
      { name: "incomeProof", maxCount: 1 },
    ]),
    async (req, res) => {
      const { name, email, contact } = req.body;

      await db.read();

      const application = {
        id: "life_" + Date.now(),
        name,
        email,
        contact,
        docs: {
          idProof: req.files?.idProof?.[0]?.filename || null,
          incomeProof: req.files?.incomeProof?.[0]?.filename || null,
        },
      };

      db.data.lifeInsurance.push(application);
      await db.write();

      res.json({
        success: true,
        message: "Life insurance application submitted successfully!",
        application,
      });
    }
  );

  return router;
}
