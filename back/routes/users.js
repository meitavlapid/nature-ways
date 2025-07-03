// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate, requireAdmin } = require("../middleware/auth");

router.get("/", authenticate , requireAdmin ,  async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "שגיאה בקבלת המשתמשים" });
  }
});

router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  const { id } = req.params;
  if (id === req.user._id.toString()) {
    return res.status(400).json({ error: "לא ניתן למחוק את עצמך" });
  }

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "המשתמש נמחק בהצלחה" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה במחיקת המשתמש" });
  }
});

router.put("/:id/role", authenticate, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  if (id === req.user._id.toString()) {
    return res.status(400).json({ error: "לא ניתן לשנות את ההרשאות שלך עצמך" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "משתמש לא נמצא" });

    user.isAdmin = isAdmin;
    await user.save();
    res.json({ message: "הרשאות עודכנו" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעדכון הרשאות" });
  }
});
