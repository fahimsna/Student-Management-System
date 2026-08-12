const express = require("express");

const {
  createMarks,
  getMarks,
  getStudentMarks,
} = require("../controllers/markController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add marks
router.post("/addMarks", authMiddleware, createMarks);

// Get all marks
router.get("/getMarks", authMiddleware, getMarks);

// Get marks for one student
router.get("/student/:studentId", authMiddleware, getStudentMarks);

module.exports = router;
