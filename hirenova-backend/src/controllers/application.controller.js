const asyncHandler = require("../utils/asyncHandler.util");
const applicationService = require("../services/application.service");

exports.applyJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user.id;

  const application = await applicationService.applyJob(jobId, userId);

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    application,
  });
});

exports.getMyApplications = asyncHandler(async (req, res) => {
  const apps = await applicationService.getMyApplications(req.user._id);

  res.json({
    success: true,
    applications: apps,
  });
});

exports.getApplicants = asyncHandler(async (req, res) => {
  const apps = await applicationService.getApplicants(req.params.jobId);

  res.json({
    success: true,
    applicants: apps,
  });
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  const recruiterId = req.user.id;

  const application = await applicationService.updateApplicationStatus(
    applicationId,
    recruiterId,
    status
  );

  res.status(200).json({
    success: true,
    message: "Application status updated",
    application,
  });
});
