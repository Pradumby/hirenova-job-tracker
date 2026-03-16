const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get(
  "/recruiter",
  protect,
  authorize("recruiter"),
  dashboardController.getRecruiterDashboard
);

module.exports = router;
