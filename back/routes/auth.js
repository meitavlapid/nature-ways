const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const sendEmail = require("../utils/sendEmail");
const RESET_SECRET = process.env.RESET_SECRET || "secret123";
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role, interests, position, phone } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "הסיסמה חייבת להכיל לפחות 8 תווים, כולל אות אחת ומספר אחד",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      interests,
      position,
      phone,
    });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    html: `<p>שלום ${user.name},</p><p>לאיפוס סיסמה לחץ כאן:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  res.json({ msg: "קישור לאיפוס נשלח למייל אם קיים במערכת" });
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, RESET_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "משתמש לא נמצא" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "הסיסמה עודכנה בהצלחה" });
  } catch (err) {
    console.error("❌ שגיאה באיפוס סיסמה:", err.message);
    res.status(400).json({ msg: "הקישור שגוי או פג תוקף" });
  }
});
module.exports = router;
