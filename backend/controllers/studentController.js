const student = require("../models/Student");

let createStudent = async (req, res) => {
  try {
    let data = req.body;
    let existEmail = await student.findOne({
      email: data.email,
    });
    if (existEmail) {
      return res.status(403).json({
        status: 0,
        message: "Email Exists",
      });
    }
    let newStudent = new student(data);
    let result = await newStudent.save();
    res.status(201).json({
      status: 1,
      message: "Student Added",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to Add Student",
    });
  }
};

module.exports = createStudent;
