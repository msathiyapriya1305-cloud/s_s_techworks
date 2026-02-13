const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// Create activity
router.post("/", async (req, res) => {
  const activity = await Activity.create(req.body);
  res.json(activity);
});

// Get recent activity
router.get("/", async (req, res) => {
  const activities = await Activity
    .find()
    .sort({ timestamp: -1 })
    .limit(50);

  res.json(activities);
});

module.exports = router;
