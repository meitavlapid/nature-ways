const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const BASE_UPLOAD_PATH = "/home/sysop/cloudinary/home";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.body.folder;
    const targetPath = path.join(BASE_UPLOAD_PATH, folder);
    fs.mkdirSync(targetPath, { recursive: true });
    cb(null, targetPath);
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");
    const uniqueName = Date.now() + "-" + cleanName;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  try {
    const { folder } = req.body;

    if (!req.file || !folder) {
      return res.status(400).json({ error: "חובה לצרף קובץ ו־folder" });
    }

    const fileName = req.file.filename;
    const url = `https://www.natureways.co.il/static/home/${folder}/${fileName}`;

    res.status(201).json({
      message: "הקובץ נשמר בהצלחה",
      url,
      fileName,
    });
  } catch (err) {
    console.error("❌ שגיאה בהעלאה:", err);
    res.status(500).json({ error: "שגיאה בהעלאת קובץ" });
  }
});

module.exports = router;
