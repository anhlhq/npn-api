const User = require("../models/User");
const { toResJson } = require("../utils/ResponseUtils");
exports.SignUpController = async (req, res) => {
  const { username, password, displayName } = req.body;
  if (username && username.length < 6) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "Username must be at least 6 characters",
        code: 400,
      })
    );
  }

  if (password && password.length < 6) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "Password must be at least 6 characters",
        code: 400,
      })
    );
  }

  let user = await new User();
  user.username = username;
  user.displayName = displayName;

  if (password) {
    await user.hashPassword(password);
  }

  await user.save();

  return res.json(toResJson({ data: user.toJsonWithoutToken() }));
};

exports.SignInController = async (req, res) => {
  const { username, password } = req.body;

  if (username && username.length < 6) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "Username must be at least 6 characters",
        code: 400,
      })
    );
  }

  if (password && password.length < 6) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "Password must be at least 6 characters",
        code: 400,
      })
    );
  }

  let user = await User.findOne({ username });

  if (!user) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "User not found",
        code: 404,
      })
    );
  }

  if (password && !(await user.checkMatchPassword(password))) {
    return res.json(
      toResJson({
        status: "FAILED",
        message: "Password is incorrect",
        code: 400,
      })
    );
  }

  return res.json(toResJson({ data: user.toJsonWithToken() }));
};
