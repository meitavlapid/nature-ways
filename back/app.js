require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uploadRoutes = require("./routes/upload");
const imageRoutes = require("./routes/images");
const aboutRoutes = require("./routes/about");
const contactRoutes = require("./routes/contact");
const articlesRoutes = require("./routes/articles");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const videoRoutes = require("./routes/videos");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use("/api/images", imageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// ברירת מחדל
app.get("/", (req, res) => {
  res.send("API is working");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecting to:", process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
