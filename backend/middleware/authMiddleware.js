let jwt = require("jsonwebtoken");

let authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 0,
      message: "Token is required",
    });
  }

  token = token.split(" ")[1];

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 0,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
