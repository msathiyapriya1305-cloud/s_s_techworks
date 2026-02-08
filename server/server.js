const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./utils/notificationScheduler");

require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

/* ================= DATABASE FIRST ================= */

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/project_requests"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */

app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/notifications", notificationRoutes); // ✅ MOVED HERE

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("API is running");
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  if (err.message === "Unsupported file type") {
    return res.status(400).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
