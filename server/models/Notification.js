const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: String,
  name: String,
  projectType: String,
  deadline: Date,

  read: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);
