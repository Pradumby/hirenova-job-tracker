const express = require("express");
const router = express();
const jobController = require("../controllers/job.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.post("/", protect, authorize("recruiter"), jobController.createJob);
router.get("/", protect, jobController.getJobs);
router.get("/:id", protect, jobController.getJobById);
router.delete("/:id", protect, authorize("recruiter"), jobController.deleteJob);

module.exports = router;
