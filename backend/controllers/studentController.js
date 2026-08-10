const student = require("../models/Student");
const user = require("../models/User");

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
      error,
    });
  }
};

let getStudent = async (req, res) => {
  try {
    let students = await student.find();
    res.status(200).json({
      status: 1,
      message: "Successfully fetched all Students",
      students,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to find Student",
    });
  }
};
let getSingleStudent = async (req, res) => {
  try {
    let data = req.params.id;
    let result = await student.findById(data);
    if (!result) {
      return res.status(404).json({
        status: 0,
        message: "Couldn't find any student",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Fetched the particular Student",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to find Student",
      error,
    });
  }
};
let updateStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    let result = await student.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        status: 0,
        message: "Couldn't find any student",
      });
    }

    res.status(200).json({
      status: 1,
      message: "Updated Successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to Update Student",
      error,
    });
  }
};
let deleteStudent = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await student.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        status: 0,
        message: "Couldn't find Student",
      });
    }
    res.status(200).json({
      status: 1,
      message: "Student deleted",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Failed to Delete Student",
      error,
    });
  }
};

module.exports = {
  createStudent,
  getStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
