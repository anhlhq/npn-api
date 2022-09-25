var express = require("express");
const cors = require("cors");
var router = express.Router();

var corsOptions = {
  origin: "https://nhanphatnhanh.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api", cors(corsOptions), require("./api"));

module.exports = router;
