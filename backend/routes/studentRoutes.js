let express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createStudent,
  getStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");
let router = express.Router();

router.post("/addStudent", authMiddleware, createStudent);
router.get("/getStudent", authMiddleware, getStudent);
router.get("/getStudent/:id", authMiddleware, getSingleStudent);
router.put("/getStudent/:id", authMiddleware, updateStudent);
router.delete("/getStudent/:id", authMiddleware, deleteStudent);

module.exports = router;
