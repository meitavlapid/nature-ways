const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    title: { type: String },
    fileUrl: { type: String, required: true }, // URL ל־PDF
  },
  { timestamps: true }
);

module.exports = mongoose.model("Research", researchSchema);
