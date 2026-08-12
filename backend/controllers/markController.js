const Marks = require("../models/Mark");

// =====================================================
// GRADE CALCULATOR
// =====================================================

const calculateGrade = (percentage) => {
  if (percentage >= 80) {
    return "A+";
  } else if (percentage >= 75) {
    return "A";
  } else if (percentage >= 70) {
    return "A-";
  } else if (percentage >= 65) {
    return "B+";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 55) {
    return "B-";
  } else if (percentage >= 50) {
    return "C+";
  } else if (percentage >= 45) {
    return "C";
  } else if (percentage >= 40) {
    return "D";
  } else {
    return "F";
  }
};

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

    const grade = calculateGrade(percentage);

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
      .sort({
        date: -1,
        createdAt: -1,
      });

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
      .sort({
        date: -1,
        createdAt: -1,
      });

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

// =====================================================
// UPDATE MARKS
// =====================================================

const updateMarks = async (req, res) => {
  try {
    const { id } = req.params;

    const { studentId, course, resultType, totalMarks, obtainedMarks, date } =
      req.body;

    console.log("Update marks request:", req.body);

    // ---------------------------------------------------
    // FIND RECORD
    // ---------------------------------------------------

    const existingMarks = await Marks.findById(id);

    if (!existingMarks) {
      return res.status(404).json({
        message: "Marks record not found",
      });
    }

    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    const student = studentId || existingMarks.student;

    const updatedCourse = course !== undefined ? course : existingMarks.course;

    const updatedResultType =
      resultType !== undefined ? resultType : existingMarks.resultType;

    const total =
      totalMarks !== undefined
        ? Number(totalMarks)
        : Number(existingMarks.totalMarks);

    const obtained =
      obtainedMarks !== undefined
        ? Number(obtainedMarks)
        : Number(existingMarks.obtainedMarks);

    const updatedDate = date || existingMarks.date;

    if (
      !student ||
      !updatedCourse ||
      !updatedResultType ||
      (totalMarks === undefined && existingMarks.totalMarks === undefined) ||
      (obtainedMarks === undefined &&
        existingMarks.obtainedMarks === undefined) ||
      !updatedDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

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
    // RECALCULATE
    // ---------------------------------------------------

    const percentage = (obtained / total) * 100;

    const grade = calculateGrade(percentage);

    // ---------------------------------------------------
    // UPDATE
    // ---------------------------------------------------

    const updatedMarks = await Marks.findByIdAndUpdate(
      id,
      {
        student: student,
        course: String(updatedCourse).trim(),
        resultType: String(updatedResultType).trim(),
        totalMarks: total,
        obtainedMarks: obtained,
        percentage: Number(percentage.toFixed(2)),
        grade,
        date: updatedDate,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("student", "name email department semester");

    console.log("Marks updated:", updatedMarks);

    return res.status(200).json({
      message: "Marks updated successfully",
      marks: updatedMarks,
    });
  } catch (error) {
    console.error("Update marks error:", error);

    return res.status(500).json({
      message: "Failed to update marks",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE MARKS
// =====================================================

const deleteMarks = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Delete marks request:", id);

    // ---------------------------------------------------
    // FIND RECORD
    // ---------------------------------------------------

    const marks = await Marks.findById(id);

    if (!marks) {
      return res.status(404).json({
        message: "Marks record not found",
      });
    }

    // ---------------------------------------------------
    // DELETE
    // ---------------------------------------------------

    await Marks.findByIdAndDelete(id);

    console.log("Marks deleted:", id);

    return res.status(200).json({
      message: "Marks deleted successfully",
    });
  } catch (error) {
    console.error("Delete marks error:", error);

    return res.status(500).json({
      message: "Failed to delete marks",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createMarks,
  getMarks,
  getStudentMarks,
  updateMarks,
  deleteMarks,
};
