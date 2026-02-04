const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});
