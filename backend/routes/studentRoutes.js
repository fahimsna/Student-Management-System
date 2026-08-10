let express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createStudent,
  getStudent,
} = require("../controllers/studentController");
let router = express.Router();

router.post("/addStudent", authMiddleware, createStudent);
router.get("/getStudent",authMiddleware, getStudent);

module.exports = router;
