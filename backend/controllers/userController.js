const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const data = req.body;

    const existEmail = await User.findOne({
      email: data.email,
    });

    if (existEmail) {
      return res.status(403).json({
        status: 0,
        message: "Email exists",
      });
    }

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = new User(data);

    const result = await newUser.save();

    res.status(201).json({
      status: 1,
      message: "Registration Successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;

    const validEmail = await User.findOne({
      email: data.email,
    });

    if (!validEmail) {
      return res.status(400).json({
        status: 0,
        message: "Please enter a valid email address",
      });
    }

    const passMatch = await bcrypt.compare(data.password, validEmail.password);

    if (!passMatch) {
      return res.status(400).json({
        status: 0,
        message: "Please enter a valid password",
      });
    }

    const token = jwt.sign(
      {
        id: validEmail._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      status: 1,
      message: "Successfully logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to login",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-password");

    if (!userData) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Authentication successful",
      user: userData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: 0,
      message: "Failed to load profile",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        status: 0,
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        status: 0,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        status: 0,
        message: "Please enter a valid email address",
      });
    }

    const existingUser = await User.findOne({
      email: email.trim(),
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        status: 0,
        message: "Email is already being used by another account",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        email: email.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Update Profile Error:", error);

    res.status(500).json({
      status: 0,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};
