const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
    at: Date.now(),
  };
  return jwt.sign(payload, __JWT_SECRET);
};

exports.verifyToken = (token) => {
  return jwt.verify(token, __JWT_SECRET);
};
