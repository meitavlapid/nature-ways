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
// אחסון למסמכים (PDF, DOCX)
const rawStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let rawTitle = "";
    if (req.body && typeof req.body.title === "string" && req.body.title.trim()) {
      rawTitle = req.body.title.trim();
    } else {
      rawTitle = file.originalname.split(".")[0];
    }

    let cleanTitle = rawTitle
      .replace(/\s+/g, "_")
      .replace(/[^א-תa-zA-Z0-9_\-]/g, "")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

    if (cleanTitle.length > 40) {
      cleanTitle = cleanTitle.substring(0, 40);
    }

    const ext = file.originalname.split(".").pop();

    return {
      folder: "researches",
      resource_type: "raw",
      public_id: cleanTitle || `file_${Date.now()}`,
      format: ext,
    };
  },
});

// אחסון לתמונות
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "research-images",
    resource_type: "image",
  },
});

const uploadRaw = multer({ storage: rawStorage });
const uploadImage = multer({ storage: imageStorage });

// GET – כל המחקרים
router.get("/", async (req, res) => {
  try {
    const list = await Research.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בטעינה" });
  }
});

// POST –
router.post(
  "/upload",
  authenticateToken,
  requireAdmin,
  uploadRaw.fields([{ name: "pdf", maxCount: 1 }]),
  async (req, res) => {
    try {
      const file = req.files?.pdf?.[0];
      if (!file) return res.status(400).json({ error: "לא הועלה קובץ" });

      const title = req.body.title?.trim() || file.originalname;
      const originalName = file.originalname;

      const fileUrl = file.path;
      const public_id = file.filename; // ← שומר את full public_id כולל 'researches/שם_הקובץ.docx'

      const research = new Research({
        title,
        originalName,
        fileUrl,
        public_id,
      });
      await research.save();

      console.log("✅ מחקר הועלה:", { title, fileUrl });
      res.status(201).json(research);
    } catch (err) {
      console.error("❌ שגיאה בהעלאה:", err);
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

    const match = research.fileUrl.match(/upload\/(?:v\d+\/)?(.+)$/);

    console.log("📄 fileUrl:", fileUrl);

    if (!match || !match[1]) {
      return res.status(400).json({ error: "לא ניתן לחלץ public_id מהקישור" });
    }

    const publicId = match[1];
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
router.post("/upload-image", uploadImage.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    res.json({ imageUrl });
  } catch (err) {
    console.error("שגיאה בהעלאת תמונה:", err);
    res.status(500).json({ error: "שגיאה בהעלאת תמונה" });
  }
});

module.exports = router;
