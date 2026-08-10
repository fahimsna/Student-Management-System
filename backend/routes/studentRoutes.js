let express = require("express");
const createStudent = require("../controllers/studentController");
let router = express.Router();

router.post("/addStudent", createStudent);

module.exports = router;
