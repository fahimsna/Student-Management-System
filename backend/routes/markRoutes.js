const express = require("express");

const router = express.Router();

const {
  createMarks,
  getMarks,
  getStudentMarks,
  updateMarks,
  deleteMarks,
} = require("../controllers/markController");

// Add marks
router.post("/addMarks", createMarks);

// Get all marks
router.get("/getMarks", getMarks);

// Get marks for one student
router.get("/student/:studentId", getStudentMarks);

// Update marks
router.put("/updateMarks/:id", updateMarks);

// Delete marks
router.delete("/deleteMarks/:id", deleteMarks);

module.exports = router;
