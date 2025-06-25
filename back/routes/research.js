const express = require("express");
const router = express.Router();
const multer = require("multer");
const Research = require("../models/Research");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// אחסון עם Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "researches",
    resource_type: "raw",
  },
});

const upload = multer({ storage });

// GET – כל המחקרים
router.get("/", async (req, res) => {
  try {
    const list = await Research.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בטעינה" });
  }
});

// POST – העלאת PDF
router.post(
  "/upload",
  authenticateToken,
  requireAdmin,
  upload.single("pdf"), // ודא שה-input בשם הזה
  async (req, res) => {
    try {
      console.log("Received file:", req.file);
      const fileUrl = req.file.path;
      const title = req.body.title || req.file.originalname;
      const research = new Research({ fileUrl, title });
      await research.save();
      res.status(201).json(research);
      console.log("req.file =", req.file);
    } catch (err) {
      console.error("שגיאה בהעלאה:", err);
      res.status(500).json({ error: "שגיאה בהעלאה", detail: err.message });
    }
  }
);

// DELETE – כולל מחיקת PDF מ־Cloudinary

router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ error: "לא נמצא" });

    const fileUrl = research.fileUrl;

    // 🔍 חילוץ נתיב נכון למחיקה, ללא v###
    const match = research.fileUrl.match(
      /upload\/(?:v\d+\/)?(.+)\.(pdf|doc|docx)$/
    );

    console.log("📄 fileUrl:", fileUrl);

    if (!match || !match[1]) {
      return res.status(400).json({ error: "לא ניתן לחלץ public_id מהקישור" });
    }

    const publicId = match[1]; // ← יהיה "researches/tkfgxwyqmyqyzezm1wiv"
    console.log("🗑️ publicId למחיקה:", publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
      invalidate: true,
    });
    console.log("🔁 תוצאת מחיקה:", result);

    await Research.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ שגיאה במחיקה:", err);
    res.status(500).json({ error: "שגיאה במחיקה", details: err.message });
  }
});

module.exports = router;
