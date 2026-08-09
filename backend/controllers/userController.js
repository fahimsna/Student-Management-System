let user = require("../models/User");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let registerUser = async (req, res) => {
  try {
    let data = req.body;

    let existEmail = await user.findOne({
      email: data.email,
    });
    if (existEmail) {
      return res.status(403).json({
        status: 0,
        message: "Email exists",
      });
    }
    data.password = await bcrypt.hash(data.password, 10);
    let newUser = new user(data);
    let result = await newUser.save();

    res.status(201).json({
      status: 1,
      message: "Registration Successfull",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Registration failled",
      error,
    });
  }
};
let loginUser = async (req, res) => {
  try {
    let data = req.body;

    let validEmail = await user.findOne({
      email: data.email,
    });

    if (!validEmail) {
      return res.status(400).json({
        status: 0,
        message: "Please Enter a valid email address",
      });
    }

    let passMatch = await bcrypt.compare(data.password, validEmail.password);

    if (!passMatch) {
      return res.status(400).json({
        status: 0,
        message: "Please Enter a valid password",
      });
    }

    let token = jwt.sign({ id: validEmail._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: 1,
      message: "Successfully Logged in",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to login",
      error,
    });
  }
};

module.exports = { registerUser, loginUser };
