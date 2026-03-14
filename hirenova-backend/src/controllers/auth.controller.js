const { registerUser, loginUser } = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const data = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: data.user,
      token: data.token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.status(201).json({
      success: true,
      message: "User login successfully",
      user: data.userOjb,
      token: data.token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
