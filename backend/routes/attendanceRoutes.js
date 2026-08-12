const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  saveAttendance,
  getAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

// Save attendance
router.post("/", authMiddleware, saveAttendance);

// Get attendance
router.get("/", authMiddleware, getAttendance);

module.exports = router;
