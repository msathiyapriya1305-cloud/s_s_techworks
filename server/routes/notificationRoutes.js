const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (err) {
    console.error("Notification fetch error:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
  router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
});

});

module.exports = router;
