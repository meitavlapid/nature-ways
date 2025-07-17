const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// אחסון דינמי לפי תקייה שמתקבלת ב-body (products, product-specs וכו')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder; // למשל: "products"
    const basePath = "/home/sysop/cloudinary/home";
    const targetPath = path.join(basePath, folder);

    // יצירת התקייה אם לא קיימת
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

// ✔️ העלאת קובץ (תמונה או spec או וידאו) לשרת
router.post("/", upload.single("file"), (req, res) => {
  try {
    const { folder } = req.body;
    if (!req.file || !folder) {
      return res.status(400).json({ error: "חובה לצרף קובץ ו־folder" });
    }

    const fileName = req.file.filename;
    const url = `/static/${folder}/${fileName}`;

    res.status(201).json({
      message: "קובץ נשמר בהצלחה",
      url,
      fileName,
    });
  } catch (err) {
    console.error("❌ שגיאה בהעלאה:", err.message);
    res.status(500).json({ error: "שגיאה בהעלאת קובץ" });
  }
});

module.exports = router;
