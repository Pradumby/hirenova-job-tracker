const Job = require("../models/job.model");
const Application = require("../models/application.model");

exports.createJob = async (jobData, userId) => {
  const job = await Job.create({
    ...jobData,
    createdBy: userId,
  });

  return job;
};

exports.getMyJobs = async (recruiterId) => {
  const job = await Job.find({ createdBy: recruiterId });

  return job;
};

exports.getJobById = async (jobId) => {
  return await Job.findById(jobId).populate("createdBy", "name");
};

exports.deleteJob = async (jobId) => {
  return await Job.findByIdAndDelete(jobId);
};

exports.getAllJobs = async (query) => {
  const keyword = query.keyword
    ? {
        title: {
          $regex: query.keyword,
          $options: "i",
        },
      }
    : {};

  const location = query.location
    ? {
        location: {
          $regex: query.location,
          $options: "i",
        },
      }
    : {};

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;

  const skip = (page - 1) * limit;

  const jobs = await Job.find({
    ...keyword,
    ...location,
  })
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "name email");

  const total = await Job.countDocuments({
    ...keyword,
    ...location,
  });

  return {
    jobs,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

exports.getRecommendedJobs = async (userId) => {
  //  Get user's applications
  const applications = await Application.find({ user: userId }).populate("job");

  if (applications.length === 0) {
    // return latest jobs
    return await Job.find().sort({ createdAt: -1 }).limit(5);
  }

  // Extract titles & locations
  const titles = applications.map((app) => app.job.title);
  const locations = applications.map((app) => app.job.location);

  //  Find similar jobs
  const recommendedJobs = await Job.find({
    $or: [
      {
        title: { $regex: titles.join("|"), $options: "i" },
      },
      {
        location: { $regex: locations.join("|"), $options: "i" },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(10);

  return recommendedJobs;
};
