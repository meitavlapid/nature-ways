const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const RESET_SECRET = process.env.RESET_SECRET || "secret123";

// 🔹 1. בקשת איפוס סיסמה
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(200)
      .json({ msg: "אם האימייל קיים – נשלח קישור לאיפוס." });

  const token = jwt.sign({ id: user._id }, RESET_SECRET, { expiresIn: "10m" });

  const resetLink = `https://nature-ways.onrender.com/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "איפוס סיסמה",
    html: `
      <p>שלום ${user.name},</p>
      <p>כדי לאפס את הסיסמה שלך לחץ על הקישור:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>אם לא ביקשת איפוס – התעלם מהודעה זו.</p>
    `,
  });

  res.json({ msg: "קישור לאיפוס נשלח למייל אם קיים במערכת" });
});
// 🔹 2. איפוס סיסמה בפועל
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, RESET_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("משתמש לא נמצא");

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ msg: "הסיסמה עודכנה בהצלחה" });
  } catch (err) {
    res.status(400).json({ msg: "הקישור שגוי או פג תוקף" });
  }
});

module.exports = router;
