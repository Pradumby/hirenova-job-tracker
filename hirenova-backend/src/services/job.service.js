const Job = require("../models/job.model");

exports.createJob = async (jobData, userId) => {
  const job = await Job.create({
    ...jobData,
    createdBy: userId,
  });

  return job;
};

exports.getJobs = async () => {
  return await Job.find().populate("createdBy", "name email");
};

exports.getJobById = async (jobId) => {
  return await Job.findById(jobId).populate("createdBy", "name");
};

exports.deleteJob = async (jobId) => {
  return await Job.findByIdAndDelete(jobId);
};
