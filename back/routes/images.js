const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Image = require("../models/Image");

// קונפיגורציית Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// הגדרת אחסון Multer עם Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "about", // ← תמונות יועלו לתיקייה הזו
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

/**
 * GET /api/images?key=about
 * מחזיר את כל התמונות לפי key
 */
router.get("/", async (req, res) => {
  try {
    const { key } = req.query;
    const filter = key ? { key } : {};
    const images = await Image.find(filter);
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בטעינת תמונות" });
  }
});

/**
 * POST /api/images
 * העלאת תמונה ושמירה במסד
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { key } = req.body;

    if (!req.file || !key) {
      return res.status(400).json({ error: "חובה לשלוח תמונה ו־key" });
    }

    const newImage = new Image({
      key,
      url: req.file.path,
      public_id: req.file.filename,
    });

    await newImage.save();

    res.status(201).json({ message: "תמונה נשמרה", image: newImage });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בהעלאה" });
  }
});

module.exports = router;
