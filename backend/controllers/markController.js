const Marks = require("../models/Mark");

// Add Marks
const createMarks = async (req, res) => {
  try {
    const { studentId, course, resultType, totalMarks, obtainedMarks, date } =
      req.body;

    if (
      !studentId ||
      !course ||
      !resultType ||
      totalMarks === undefined ||
      obtainedMarks === undefined ||
      !date
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (Number(obtainedMarks) > Number(totalMarks)) {
      return res.status(400).json({
        message: "Obtained marks cannot be greater than total marks",
      });
    }

    const percentage = (Number(obtainedMarks) / Number(totalMarks)) * 100;

    let grade;

    if (percentage >= 80) grade = "A+";
    else if (percentage >= 75) grade = "A";
    else if (percentage >= 70) grade = "A-";
    else if (percentage >= 65) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 55) grade = "B-";
    else if (percentage >= 50) grade = "C+";
    else if (percentage >= 45) grade = "C";
    else if (percentage >= 40) grade = "D";
    else grade = "F";

    const marks = await Marks.create({
      student: studentId,
      course,
      resultType,
      totalMarks,
      obtainedMarks,
      percentage: Number(percentage.toFixed(2)),
      grade,
      date,
    });

    res.status(201).json({
      message: "Marks added successfully",
      marks,
    });
  } catch (error) {
    console.error("Create marks error:", error);

    res.status(500).json({
      message: "Failed to add marks",
      error: error.message,
    });
  }
};

// Get all marks
const getMarks = async (req, res) => {
  try {
    const marks = await Marks.find()
      .populate("student", "name email department semester")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Marks fetched successfully",
      marks,
    });
  } catch (error) {
    console.error("Get marks error:", error);

    res.status(500).json({
      message: "Failed to fetch marks",
      error: error.message,
    });
  }
};

// Get marks of one student
const getStudentMarks = async (req, res) => {
  try {
    const marks = await Marks.find({
      student: req.params.studentId,
    })
      .populate("student", "name email department semester")
      .sort({ date: -1 });

    res.status(200).json({
      message: "Student marks fetched successfully",
      marks,
    });
  } catch (error) {
    console.error("Get student marks error:", error);

    res.status(500).json({
      message: "Failed to fetch student marks",
      error: error.message,
    });
  }
};

module.exports = {
  createMarks,
  getMarks,
  getStudentMarks,
};
