const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    originalName: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true }, // ← כאן ייכנס: researches/שם_הקובץ
    imageUrl: { type: String, trim: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Research", researchSchema);
