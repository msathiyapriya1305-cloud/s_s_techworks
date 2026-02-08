const Project = require("../models/Project");
const Notification = require("../models/Notification");

/* =====================================================
   CREATE PROJECT (STUDENT)
===================================================== */
exports.createRequest = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      projectType,
      description,
      deadline,
    } = req.body;

    if (!name || !email || !phone || !projectType || !deadline) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const files = req.files ? req.files.map(f => f.path) : [];

    const project = new Project({
      name,
      email,
      phone,
      projectType,
      description,
      deadline,
      files,
    });

    await project.save();
    await Notification.create({
  title: "New Project Request",
  name,
  projectType,
  deadline,
});



    res.status(201).json(project);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Failed to create project" });
  }
};

/* =====================================================
   GET ALL PROJECTS (ADMIN)
===================================================== */
exports.getAllRequests = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

/* =====================================================
   UPDATE PROJECT STATUS
===================================================== */
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (err) {
    console.error("STATUS ERROR:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* =====================================================
   DELETE PROJECT
===================================================== */
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

/* =====================================================
   ADD TASK
===================================================== */
exports.addTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title required",
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.tasks.push({
      title: title.trim(),
      completed: false,
      files: [],
    });

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({
      message: "Failed to add task",
    });
  }
};

/* =====================================================
   TOGGLE TASK
===================================================== */
exports.toggleTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.completed = !task.completed;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("TOGGLE TASK ERROR:", err);
    res.status(500).json({
      message: "Failed to toggle task",
    });
  }
};

/* =====================================================
   DELETE TASK
===================================================== */
exports.deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.deleteOne();

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("DELETE TASK ERROR:", err);
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

/* =====================================================
   UPLOAD TASK FILE
===================================================== */
exports.uploadTaskFile = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.files.push(req.file.path);

    await project.save();

    res.json(project);
  } catch (err) {
    console.error("UPLOAD FILE ERROR:", err);
    res.status(500).json({
      message: "Failed to upload task file",
    });
  }
};
