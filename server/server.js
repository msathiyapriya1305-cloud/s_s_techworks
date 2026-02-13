require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


/* ================= APP INIT ================= */

const app = express();

/* ================= DATABASE ================= */

mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/project_requests"
  )
  .then(() => {
    console.log("✅ MongoDB connected");

    // ✅ Start scheduler ONLY after DB connects
    require("./utils/notificationScheduler");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

/* ================= STATIC FILES ================= */

/*
🔥 IMPORTANT:
This fixes Windows/Linux upload preview issues
*/

const path = require("path");

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ================= ROUTES ================= */

app.use("/api/activity", require("./routes/activity"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.json({ status: "API running ✅" });
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);

  if (err.message === "Unsupported file type") {
    return res.status(400).json({
      message: "Unsupported file format",
    });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Backend running → http://localhost:${PORT}`
  );
});
