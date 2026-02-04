const ProjectRequest = require("../models/ProjectRequest");

exports.createRequest = async (req, res) => {
  try {
    const files = req.files ? req.files.map(f => f.path) : [];

    const project = await ProjectRequest.create({
      ...req.body,
      files
    });

    res.status(201).json({
      success: true,
      message: "Project request submitted successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  const projects = await ProjectRequest.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.updateStatus = async (req, res) => {
  await ProjectRequest.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ success: true });
};
