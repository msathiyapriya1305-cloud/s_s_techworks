const express = require("express");
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const Project = require("../models/Project");

const {
  createRequest,
  getAllRequests,
  updateStatus,
  deleteProject,
  addTask,
  toggleTask,
  uploadTaskFile,
  deleteTask,
} = require("../controllers/projectController");

const router = express.Router();

/* =====================================================
   PUBLIC – CREATE PROJECT REQUEST (STUDENT)
===================================================== */
router.post("/", upload.array("files", 5), createRequest);

/* =====================================================
   ADMIN – DASHBOARD STATS
===================================================== */
router.get("/stats", auth, async (req, res) => {
  try {
    const total = await Project.countDocuments();

    const pending = await Project.countDocuments({
      status: "Pending",
    });

    const completed = await Project.countDocuments({
      status: "Completed",
    });

    // ✅ FIXED: deadline instead of due
    const overdue = await Project.countDocuments({
      status: "Pending",
      deadline: { $lt: new Date() },
    });

    // ✅ FIXED: deadline instead of due
    const dueThisWeek = await Project.countDocuments({
      deadline: {
        $gte: new Date(),
        $lte: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    res.json({
      total,
      pending,
      completed,
      overdue,
      dueThisWeek,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

/* =====================================================
   ADMIN – UPCOMING DEADLINES
===================================================== */
router.get("/deadlines", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      status: { $ne: "Completed" },
    })
      // ✅ FIXED: deadline instead of due
      .sort({ deadline: 1 })
      .limit(10);

    res.json(projects);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch deadlines",
    });
  }
});

/* =====================================================
   ADMIN – GET ALL PROJECT REQUESTS
===================================================== */
router.get("/", auth, getAllRequests);

/* =====================================================
   ADMIN – UPDATE PROJECT STATUS
===================================================== */
router.patch("/:id", auth, updateStatus);

/* =====================================================
   ADMIN – DELETE PROJECT
===================================================== */
/* DELETE TASK */
router.delete("/:id", auth, deleteProject);
router.delete(
  "/:projectId/tasks/:taskId",
  auth,
  deleteTask
);



/* =====================================================
   ADMIN – TASK MANAGEMENT
===================================================== */

/* ADD TASK */
router.post("/:id/tasks", auth, addTask);

/* TOGGLE TASK */
router.patch("/:projectId/tasks/:taskId", auth, toggleTask);

/* UPLOAD FILE FOR TASK */
router.post(
  "/:projectId/tasks/:taskId/files",
  auth,
  upload.single("file"),
  uploadTaskFile
);

module.exports = router;
