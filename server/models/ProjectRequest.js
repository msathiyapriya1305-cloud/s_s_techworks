const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  files: [String],
});

const projectSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    projectType: String,
    description: String,

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    deadline: Date,

    files: [String],        // files uploaded by student
    tasks: [taskSchema],    // admin internal tasks
    progress: { type: Number, default: 0 },

    isNew: { type: Boolean, default: true }, // 🔔 notification
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
