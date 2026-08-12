const Marks = require("../models/Mark");

// =====================================================
// ADD MARKS
// =====================================================

const createMarks = async (req, res) => {
  try {
    const { studentId, course, resultType, totalMarks, obtainedMarks, date } =
      req.body;

    console.log("Create marks request:", req.body);

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

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

    const total = Number(totalMarks);
    const obtained = Number(obtainedMarks);

    if (Number.isNaN(total) || Number.isNaN(obtained)) {
      return res.status(400).json({
        message: "Marks must be valid numbers",
      });
    }

    if (total <= 0) {
      return res.status(400).json({
        message: "Total marks must be greater than 0",
      });
    }

    if (obtained < 0) {
      return res.status(400).json({
        message: "Obtained marks cannot be negative",
      });
    }

    if (obtained > total) {
      return res.status(400).json({
        message: "Obtained marks cannot be greater than total marks",
      });
    }

    // ---------------------------------------------------
    // CALCULATE PERCENTAGE
    // ---------------------------------------------------

    const percentage = (obtained / total) * 100;

    // ---------------------------------------------------
    // CALCULATE GRADE
    // ---------------------------------------------------

    let grade;

    if (percentage >= 80) {
      grade = "A+";
    } else if (percentage >= 75) {
      grade = "A";
    } else if (percentage >= 70) {
      grade = "A-";
    } else if (percentage >= 65) {
      grade = "B+";
    } else if (percentage >= 60) {
      grade = "B";
    } else if (percentage >= 55) {
      grade = "B-";
    } else if (percentage >= 50) {
      grade = "C+";
    } else if (percentage >= 45) {
      grade = "C";
    } else if (percentage >= 40) {
      grade = "D";
    } else {
      grade = "F";
    }

    // ---------------------------------------------------
    // CREATE RECORD
    // ---------------------------------------------------

    const marks = await Marks.create({
      student: studentId,
      course: course.trim(),
      resultType: resultType.trim(),
      totalMarks: total,
      obtainedMarks: obtained,
      percentage: Number(percentage.toFixed(2)),
      grade,
      date,
    });

    console.log("Marks saved:", marks);

    return res.status(201).json({
      message: "Marks added successfully",
      marks,
    });
  } catch (error) {
    console.error("Create marks error:", error);

    return res.status(500).json({
      message: "Failed to add marks",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL MARKS
// =====================================================

const getMarks = async (req, res) => {
  try {
    const marks = await Marks.find()
      .populate("student", "name email department semester")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      message: "Marks fetched successfully",
      marks,
    });
  } catch (error) {
    console.error("Get marks error:", error);

    return res.status(500).json({
      message: "Failed to fetch marks",
      error: error.message,
    });
  }
};

// =====================================================
// GET MARKS FOR ONE STUDENT
// =====================================================

const getStudentMarks = async (req, res) => {
  try {
    const marks = await Marks.find({
      student: req.params.studentId,
    })
      .populate("student", "name email department semester")
      .sort({ date: -1, createdAt: -1 });

    return res.status(200).json({
      message: "Student marks fetched successfully",
      marks,
    });
  } catch (error) {
    console.error("Get student marks error:", error);

    return res.status(500).json({
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
