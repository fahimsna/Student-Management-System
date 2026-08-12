const Attendance = require("../models/Attendance");
const Student = require("../models/Student");

// ===============================
// Save Attendance
// ===============================
const saveAttendance = async (req, res) => {
  try {
    const { date, department, semester, attendance } = req.body;

    // Validate required fields
    if (!date || !department || !semester || !attendance) {
      return res.status(400).json({
        success: false,
        message:
          "Date, department, semester, and attendance records are required.",
      });
    }

    // Validate attendance array
    if (!Array.isArray(attendance) || attendance.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one attendance record is required.",
      });
    }

    // Validate each attendance record
    for (const record of attendance) {
      if (!record.studentId || !record.status) {
        return res.status(400).json({
          success: false,
          message: "Each attendance record must have studentId and status.",
        });
      }

      if (!["Present", "Absent", "Late"].includes(record.status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid attendance status: ${record.status}`,
        });
      }
    }

    // Normalize date to avoid duplicate dates caused by time differences
    const attendanceDate = new Date(date);

    if (isNaN(attendanceDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date.",
      });
    }

    attendanceDate.setHours(0, 0, 0, 0);

    // Check whether attendance already exists
    const existingAttendance = await Attendance.findOne({
      date: attendanceDate,
      department: department.trim(),
      semester: semester.trim(),
    });

    if (existingAttendance) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance for this department, semester, and date already exists.",
      });
    }

    // Verify students exist
    const studentIds = attendance.map((record) => record.studentId);

    const students = await Student.find({
      _id: { $in: studentIds },
    }).select("_id");

    const existingStudentIds = new Set(
      students.map((student) => student._id.toString()),
    );

    const invalidStudents = studentIds.filter(
      (id) => !existingStudentIds.has(id.toString()),
    );

    if (invalidStudents.length > 0) {
      return res.status(400).json({
        success: false,
        message: "One or more student IDs are invalid.",
        invalidStudents,
      });
    }

    // Create attendance
    const newAttendance = await Attendance.create({
      date: attendanceDate,
      department: department.trim(),
      semester: semester.trim(),
      attendance,
      createdBy: req.user?._id || req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Attendance saved successfully.",
      attendance: newAttendance,
    });
  } catch (error) {
    console.error("Save attendance error:", error);

    // Handle duplicate index error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance for this department, semester, and date already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to save attendance.",
      error: error.message,
    });
  }
};

// ===============================
// Get Attendance
// ===============================
const getAttendance = async (req, res) => {
  try {
    const { date, department, semester, studentId } = req.query;

    const filter = {};

    // Date filter
    if (date) {
      const attendanceDate = new Date(date);

      if (isNaN(attendanceDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid date.",
        });
      }

      attendanceDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(attendanceDate);
      nextDate.setDate(nextDate.getDate() + 1);

      filter.date = {
        $gte: attendanceDate,
        $lt: nextDate,
      };
    }

    // Department filter
    if (department) {
      filter.department = department.trim();
    }

    // Semester filter
    if (semester) {
      filter.semester = semester.trim();
    }

    let attendanceRecords = await Attendance.find(filter)
      .populate("attendance.studentId", "name email department semester")
      .sort({ date: -1 });

    // Filter by student if requested
    if (studentId) {
      attendanceRecords = attendanceRecords
        .map((record) => {
          const matchingAttendance = record.attendance.filter(
            (item) => item.studentId?._id?.toString() === studentId.toString(),
          );

          if (matchingAttendance.length === 0) {
            return null;
          }

          return {
            ...record.toObject(),
            attendance: matchingAttendance,
          };
        })
        .filter(Boolean);
    }

    return res.status(200).json({
      success: true,
      count: attendanceRecords.length,
      attendance: attendanceRecords,
    });
  } catch (error) {
    console.error("Get attendance error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance.",
      error: error.message,
    });
  }
};

module.exports = {
  saveAttendance,
  getAttendance,
};
