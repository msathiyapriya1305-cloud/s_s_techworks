const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const auth = require("../middleware/authMiddleware");

/* =====================================================
   GET ALL NOTIFICATIONS
===================================================== */

router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (err) {
    console.error("Notification fetch error:", err);
    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
});

/* =====================================================
   MARK ALL AS READ (🔥 MUST COME BEFORE :id ROUTE)
===================================================== */

router.patch("/mark-all/read", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { read: false },
      { read: true }
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (err) {
    console.error("Mark all read error:", err);
    res.status(500).json({
      message: "Failed to update notifications",
    });
  }
});

/* =====================================================
   MARK SINGLE NOTIFICATION AS READ
===================================================== */

router.patch("/:id", auth, async (req, res) => {
  try {
    const notification =
      await Notification.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
      );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json(notification);
  } catch (err) {
    console.error("Notification update error:", err);
    res.status(500).json({
      message: "Failed to update notification",
    });
  }
});

module.exports = router;
