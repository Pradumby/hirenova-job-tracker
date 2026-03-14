const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/password.util");
const { generateToken } = require("../utils/jwt.util");

exports.registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const createdUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken({ id: createdUser._id, role: createdUser.role });

  const user = createdUser.toObject();
  delete user.password;

  return { user, token };
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All feilds are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user._id, role: user.role });

  const userOjb = user.toObject();
  delete userOjb.password;

  return { userOjb, token };
};
