let express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

let router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Authentication successful",
    user: req.user,
  });
});

module.exports = router;
