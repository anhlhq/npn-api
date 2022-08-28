const express = require("express");
const { toResJson } = require("../../utils/ResponseUtils");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/me", require("./me"));
router.use("/posts", require("./post"));
router.use("/files", require("./file"));

router.use((err, req, res, next) => {
  console.log(err);
  res.json(
    toResJson({
      status: "FAILED",
      message: err.message,
      code: 500,
    })
  );
});

module.exports = router;
