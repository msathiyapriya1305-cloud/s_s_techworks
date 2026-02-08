const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ================= ENSURE UPLOAD FOLDER EXISTS ================= */

const uploadDir = "uploads/";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ================= STORAGE CONFIG ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

/* ================= FILE FILTER (SECURITY) ================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".zip",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    return cb(
      new Error("Unsupported file type"),
      false
    );
  }

  cb(null, true);
};

/* ================= MULTER CONFIG ================= */

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
  },
});

module.exports = upload;
