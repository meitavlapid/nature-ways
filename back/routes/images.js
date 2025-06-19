// routes/images.js
const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בטעינת תמונות" });
  }
});

module.exports = router;
