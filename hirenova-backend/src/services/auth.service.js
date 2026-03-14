const User = require("../models/user.model");
const { hashPassword } = require("../utils/password.util");
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
