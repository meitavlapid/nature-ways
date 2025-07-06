const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const streamifier = require("streamifier");

// הגדרת Cloudinary מה־env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// אחסון רגיל לתמונות בלבד
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const uploadImage = multer({ storage: imageStorage });

// אחסון זמני לקבצים לא־תמונתיים (Word/PDF)
const memoryStorage = multer.memoryStorage();
const uploadSpec = multer({ storage: memoryStorage });

/* =====================
   📸 העלאת תמונה
   ===================== */
router.post("/", uploadImage.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "קובץ לא התקבל" });
  }
  res.json({
    imageUrl: req.file.path,
    public_id: req.file.filename,
  });
});

/* =====================
   🧽 מחיקת תמונה לפי public_id
   ===================== */
router.delete("/:public_id", async (req, res) => {
  try {
    const { public_id } = req.params;
    const result = await cloudinary.uploader.destroy(`products/${public_id}`);
    res.json({ message: "תמונה נמחקה", result });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת תמונה" });
  }
});

/* =====================
   📄 העלאת קובץ מפרט (Word / PDF)
   ===================== */
router.post("/spec", uploadSpec.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "לא נשלח קובץ" });
    }

    // חילוץ שם וסיומת הקובץ המקוריים
    const ext = req.file.originalname.split(".").pop(); // לדוגמה docx
    const baseName = req.file.originalname.replace(/\.[^/.]+$/, ""); // בלי סיומת

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "product-specs",
        public_id: `${baseName}-${Date.now()}`, // שם ברור כולל תאריך
        format: ext,
      },
      (error, result) => {
        if (error) {
          console.error("שגיאה בהעלאה ל-Cloudinary:", error);
          return res.status(500).json({ msg: "שגיאה בהעלאת הקובץ" });
        }
        res.json({ fileUrl: result.secure_url });
      }
    );

    // שליחה של הקובץ מה־buffer
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error("❌ שגיאה בשרת:", err.message);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

module.exports = router;
