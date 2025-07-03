const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

// POST /api/register
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, role, interests } = req.body;

    if (!name || !email || !role) {
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
      password: "", // אין צורך בסיסמה בשלב זה
      role: "user",
      source: "registration", // אופציונלי לזיהוי מקור
      phone,
      interests,
    });

    await newUser.save();
    await sendWelcomeEmail(email, name);

    res.status(201).json({ msg: "נרשמת בהצלחה!" });
  } catch (err) {
    console.error("שגיאה בהרשמה:", err.message);
    res.status(500).json({ msg: "שגיאה בשרת" });
  }
});

router.get("/all", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await RegisteredUser.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בקבלת רשומים" });
  }
});

module.exports = router;
