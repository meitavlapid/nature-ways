const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  key: String, // למשל: "home", "nutri", "dermo"
  url: String, // הקישור מ־Cloudinary
});

module.exports = mongoose.model("Image", imageSchema);
