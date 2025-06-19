require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const researchRoutes = require("./routes/research");

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const videoRoutes = require("./routes/videos");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/api/research", researchRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/videos", videoRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// ברירת מחדל
app.get("/", (req, res) => {
  res.send("API is working");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/natureways", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
