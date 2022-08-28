const express = require("express");
const { toResJson } = require("../../utils/ResponseUtils");
const router = express.Router();

const {
  SignUpController,
  SignInController,
} = require("../../controllers/auth");

router.post("/signup", SignUpController);
router.post("/signin", SignInController);

module.exports = router;
