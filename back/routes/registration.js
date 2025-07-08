const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, position, interests, password } = req.body;

    if (!name || !email || !position){
      return res.status(400).json({ msg: "שדות חובה חסרים" });
    }

    // 1. אם המשתמש כבר קיים - לא להכניס פעמיים
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "האימייל כבר רשום במערכת" });
    }

    // 2. צור משתמש בסיסי עם role = user
    const newUser = new User({
      name,
      email,
      phone,
      password,
      position, // ✅ חדש
      role: "user",
      interests,
      source: "registration",
    });

    try {
      await newUser.save();
      console.log("👤 נשמר משתמש:", newUser);
    } catch (err) {
      console.error("❌ שגיאה בשמירת המשתמש:", err);
      return res.status(500).json({ msg: "שגיאה בשמירת המשתמש" });
    }

    // שליחת מייל ברוכים הבאים
    try {
      console.log("➡ שולח מייל ל:", email);
      await sendWelcomeEmail(email, name);
      console.log("✅ נשלח מייל בהצלחה");
    } catch (emailErr) {
      console.warn("⚠️ שגיאה בשליחת מייל:", emailErr.message);
    }

    // תשובה ללקוח
    res.status(201).json({ msg: "נרשמת בהצלחה!" });
  } catch (err) {
    console.error("❌ שגיאה בהרשמה:", err);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});





router.get("/all", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ source: "registration" }).sort({
      createdAt: -1,
    });
    res.json(users);
  } catch (err) {
    console.error("❌ שגיאה בשליפת נרשמים:", err);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

module.exports = router;
