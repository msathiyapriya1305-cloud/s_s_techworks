const mongoose = require("mongoose");

/* ================= TASK SCHEMA ================= */

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  assignedTo: {
    type: String,
    default: null,
  },

  files: [String],
});

/* ================= PROJECT SCHEMA ================= */

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

    files: [String],
    tasks: [taskSchema],

    progress: {
      type: Number,
      default: 0,
    },

    isUnread: {
  type: Boolean,
  default: true,
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
