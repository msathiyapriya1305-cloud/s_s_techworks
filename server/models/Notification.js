const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["project", "task", "system"],
      default: "system",
    },

    read: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true, // ✅ auto createdAt & updatedAt
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
