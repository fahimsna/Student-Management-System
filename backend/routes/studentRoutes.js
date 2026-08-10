let express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const createStudent = require("../controllers/studentController");
let router = express.Router();

router.post("/addStudent", authMiddleware, createStudent);

module.exports = router;
