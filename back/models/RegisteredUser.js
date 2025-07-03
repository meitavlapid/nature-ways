const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String, // יכול להישאר ריק
    role: { type: String, default: "user" }, // user, admin, guest
    phone: String,
    interests: [String],
    source: String, // "registration", "admin", וכו'
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisteredUser", userSchema);