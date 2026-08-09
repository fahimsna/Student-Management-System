let express = require("express");
const registerUser = require("../controllers/userController");

let router = express.Router();

router.post("/register", registerUser);

module.exports = router;
