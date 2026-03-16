const dashboardService = require("../services/dashboard.service");
const asyncHandler = require("../utils/asyncHandler.util");

exports.getRecruiterDashboard = asyncHandler(async (req, res) => {
  const recruiterId = req.user.id;

  const data = await dashboardService.getRecruiterDashboard(recruiterId);

  res.status(200).json({
    success: true,
    data,
  });
});
