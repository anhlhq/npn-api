const express = require("express");
const middlewares = require("./middlewares");
const router = express.Router();

const {
  SignUpController,
  SignInController,
  checkToken,
} = require("../../controllers/auth");

router.post("/signup", SignUpController);
router.post("/signin", SignInController);
router.get("/checkToken", middlewares.authenticate, checkToken);

module.exports = router;
