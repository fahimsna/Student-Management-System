const express = require("express");

const {
  createMarks,
  getMarks,
  getStudentMarks,
} = require("../controllers/markController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// ADD MARKS
// POST /api/marks/addMarks
// =====================================================

router.post("/addMarks", authMiddleware, createMarks);

// =====================================================
// GET ALL MARKS
// GET /api/marks/getMarks
// =====================================================

router.get("/getMarks", authMiddleware, getMarks);

// =====================================================
// GET MARKS FOR ONE STUDENT
// GET /api/marks/student/:studentId
// =====================================================

router.get("/student/:studentId", authMiddleware, getStudentMarks);

module.exports = router;
