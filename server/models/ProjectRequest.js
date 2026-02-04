const mongoose = require("mongoose");

const projectRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    institution: String,
    projectType: String,
    description: String,
    deadline: Date,
    files: [String],
    status: {
      type: String,
      default: "New"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectRequest", projectRequestSchema);
