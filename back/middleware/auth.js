const jwt = require("jsonwebtoken");

// אימות בסיסי – בודק שהטוקן תקין
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // ציפייה ל- "Bearer TOKEN"

  if (!token) return res.status(401).json({ msg: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // מכיל: userId, role
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid or expired token" });
  }
}

// בדיקה אם המשתמש הוא אדמין
function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
}

module.exports = { authenticateToken, requireAdmin };
