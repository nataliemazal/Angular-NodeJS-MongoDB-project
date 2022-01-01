const jwt = require("jsonwebtoken");

function getNewToken(user) {
  return jwt.sign({ user }, config.jwtKey, { expiresIn: "30m" });
}

module.exports = {
  getNewToken,
};
