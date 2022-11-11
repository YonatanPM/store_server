const jwt = require("jsonwebtoken");
const config = require("config");

// token decoding midllware using jwt library for user router endpoints

module.exports = (req, res, next) => {
  const token = req.header("acsses-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtKey"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send("Invalid token.");
  }
};
