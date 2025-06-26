const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  heading: String,
  paragraph1: String,
  paragraph2: String,
  paragraph3: String,
  img: String,
  teamImages: [String],
  tagline: String,
});

module.exports = mongoose.model("About", aboutSchema);
