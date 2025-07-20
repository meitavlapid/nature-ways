const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Image = require("../models/Image");
const About = require("../models/About");

// הגדרת אחסון בשרת מקומי
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // תיקייה יחסית
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// קבלת תמונות לפי key
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

// העלאת תמונה ושמירה במסד
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { key } = req.body;

    if (!req.file || !key) {
      return res.status(400).json({ error: "חובה לשלוח תמונה ו־key" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    console.log(imageUrl, "imageUrl");

    const newImage = new Image({
      key,
      url: imageUrl,
      public_id: req.file.filename,
    });

    await newImage.save();

    if (key === "about") {
      await About.findOneAndUpdate(
        { key: "about" },
        { img: imageUrl },
        { new: true }
      );
    }

    res.status(201).json({ message: "תמונה נשמרה", image: newImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "שגיאה בהעלאה" });
  }
});

module.exports = router;
