const mongoose = require("mongoose");

/* ================= TASK SUB-SCHEMA ================= */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    files: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

/* ================= PROJECT SCHEMA ================= */
const projectSchema = new mongoose.Schema(
  {
    /* ===== STUDENT DETAILS ===== */
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    /* ===== PROJECT DETAILS ===== */
    projectType: {
      type: String,
      required: true,
    },

    description: String,

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    /* ===== DEADLINE ===== */
    deadline: {
      type: Date,
      required: true,
    },

    /* ===== ADMIN TASKS ===== */
    tasks: {
      type: [taskSchema],
      default: [],
    },

    /* ===== AUTO PROGRESS ===== */
    progress: {
      type: Number,
      default: 0,
    },

    /* ===== FILES ===== */
    files: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

/* ================= AUTO PROGRESS CALC ================= */
projectSchema.pre("save", function () {
  if (!this.tasks || this.tasks.length === 0) {
    this.progress = 0;
  } else {
    const completedCount = this.tasks.filter(
      (task) => task.completed
    ).length;

    this.progress = Math.round(
      (completedCount / this.tasks.length) * 100
    );
  }
});


module.exports = mongoose.model("Project", projectSchema);
