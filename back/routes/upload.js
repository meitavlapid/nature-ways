const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ✨ בסיס תקיית יעד חדש:
const BASE_UPLOAD_PATH = "/home"; // ← במקום /home/sysop/cloudinary/home

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder; // products, about וכו'
    const targetPath = path.join(BASE_UPLOAD_PATH, folder);

    // יצירת התיקייה אם לא קיימת
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    cb(null, targetPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✔️ העלאת קובץ
router.post("/", upload.single("file"), (req, res) => {
  try {
    const { folder } = req.body;

    if (!req.file || !folder) {
      return res.status(400).json({ error: "חובה לצרף קובץ ו־folder" });
    }

    // URL ציבורי: תלוי איפה אתה משרת את תיקיית /home
    const fileName = req.file.filename;
    const url = `/static/${folder}/${fileName}`; // ← אם static מפנה ל /home

    res.status(201).json({
      message: "קובץ נשמר בהצלחה",
      url,
      fileName,
    });
  } catch (err) {
    console.error("❌ שגיאה בהעלאה:", err);
    res.status(500).json({ error: "שגיאה בהעלאת קובץ" });
  }
});

module.exports = router;
