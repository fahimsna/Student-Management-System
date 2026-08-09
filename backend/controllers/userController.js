let user = require("../models/User");
let bcrypt = require("bcrypt");

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

module.exports = registerUser;
