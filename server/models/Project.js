const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    projectType: String,
    description: String,
    deadline: Date,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Overdue"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
