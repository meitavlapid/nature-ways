const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" }, // לרשומים ללא סיסמה
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: String,
    interests: [String], // תחומי עניין לבחירה
    source: { type: String, default: "registration" }, // או "admin", "manual"
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
