const express = require("express");
const router = express.Router();
const About = require("../models/About");

// שליפת תוכן הדף
router.get("/:key", async (req, res) => {
  try {
    const page = await About.findOne({ key: req.params.key });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בטעינה" });
  }
});

// עדכון תוכן הדף
router.put("/:key", async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעדכון" });
  }
});

module.exports = router;
