const express = require("express");
const router = express.Router();

const {
  applyJob,
  getApplications
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

// Apply for job
router.post("/", protect, applyJob);

// View applications
router.get("/", protect, getApplications);

module.exports = router;