const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

// Get all jobs
router.get("/", getJobs);

// Get single job
router.get("/:id", getJobById);

// Create job
router.post("/", protect, createJob);

// Update job
router.put("/:id", protect, updateJob);

// Delete job
router.delete("/:id", protect, deleteJob);

module.exports = router;