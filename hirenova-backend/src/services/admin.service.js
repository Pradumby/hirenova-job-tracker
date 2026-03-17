const User = require("../models/user.model");
const Job = require("../models/job.model");
const Application = require("../models/application.model");

exports.getAllUsers = async () => {
  return await User.find({ role: "user" }).select("-password");
};

exports.getAllRecruiters = async () => {
  return await User.find({ role: "recruiter" }).select("-password");
};

exports.updateUserStatus = async (userId, status) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.status = status;

  await user.save();

  return user;
};
