// routes/users.js
// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "שגיאה בטעינת המשתמשים" });
  }
});


router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
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

router.put("/:id/role", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({ error: "ערך הרשאה לא חוקי" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "משתמש לא נמצא" });

    user.role = role;
    await user.save();
    res.json({ message: "הרשאות עודכנו" });
  } catch (err) {
    res.status(500).json({ error: "שגיאה בעדכון הרשאות" });
  }
});
module.exports = router;
