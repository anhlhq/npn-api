const { authenticate } = require("./middlewares");
const { toResJson } = require("../../utils/ResponseUtils");
const router = require("express").Router();

router.get("/", authenticate, async (req, res) => {
  res.json(toResJson({ data: req.user }));
});

module.exports = router;
