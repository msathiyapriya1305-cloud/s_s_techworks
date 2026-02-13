const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ✅ new fields
    name: String,
    avatar: String,
    lastSeen: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
