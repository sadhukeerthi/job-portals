const Job = require("../models/Job");

// Add Job
const createJob = async (req, res) => {
  try {

    const job = await Job.create(req.body);

    res.status(201).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Jobs
const getJobs = async (req, res) => {
  try {

    const jobs = await Job.find();

    res.status(200).json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    res.status(200).json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedJob);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
};