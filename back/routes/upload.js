const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// העלאת תמונה
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "קובץ לא התקבל" });
  }
  res.json({
    imageUrl: req.file.path,
    public_id: req.file.filename, // שמירה לזיהוי עתידי
  });
});

// מחיקת תמונה לפי public_id
router.delete("/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(`products/${public_id}`);
    res.json({ message: "תמונה נמחקה", result });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת תמונה" });
  }
});
router.post("/spec", upload.single("file"), async (req, res) => {
  try {
    res.json({ fileUrl: req.file.path });
  } catch (err) {
    console.error("❌ שגיאה בהעלאת קובץ מפרט:", err.message);
    res.status(500).json({ msg: "שגיאה בהעלאת הקובץ" });
  }
});
module.exports = router;
