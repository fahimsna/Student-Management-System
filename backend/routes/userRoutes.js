let express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;
