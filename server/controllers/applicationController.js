const Application = require("../models/Application");

// Apply Job
const applyJob = async (req, res) => {
  try {

    const application = await Application.create({
      userId: req.body.userId,
      jobId: req.body.jobId
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Applications
const getApplications = async (req, res) => {
  try {

    const applications = await Application.find()
      .populate("userId")
      .populate("jobId");

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  applyJob,
  getApplications
};