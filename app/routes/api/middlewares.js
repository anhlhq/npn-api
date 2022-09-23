const { toResJson } = require("../../utils/ResponseUtils");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
exports.authenticate = async (req, res, next) => {
  if (req.user) next();
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token && token === null) {
      return res.status(401).json(
        toResJson({
          status: "FAILED",
          message: "No token provided",
          code: 401,
        })
      );
    }
    const decoded = jwt.verify(token, __JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json(
          toResJson({ status: "FAILED", message: "Invalid token", code: 401 })
        );
    }
    let user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json(
          toResJson({ status: "FAILED", message: "User not found", code: 404 })
        );
    }
    if (decoded.role !== "admin") {
      return res
        .status(401)
        .json(
          toResJson({ status: "FAILED", message: "Unauthorized", code: 401 })
        );
    }
    req.user = user.toJsonWithoutToken();
    user
      .updateOne({
        lastActivity: new Date(),
      })
      .then();
    // req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(toResJson({ status: "FAILED", message: error.message, code: 401 }));
  }
};
