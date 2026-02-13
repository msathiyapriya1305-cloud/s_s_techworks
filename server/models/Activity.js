const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  message: String,
  type: String, // create / update / delete / task / status
  projectId: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
