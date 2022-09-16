const multer = require("multer");
const FileUpload = require("../../models/FileUpload");
const { toResJson } = require("../../utils/ResponseUtils");
const router = require("express").Router();
const fs = require("fs");
const { base } = require("../../models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res, next) => {
  const file = req.file;
  console.log("f", req);
  if (!file) {
    res.json(
      toResJson({
        status: "FAILED",
        message: "No file provided",
        code: 400,
      })
    );
    return next();
  }

  const fileUpload = await new FileUpload();
  fileUpload.name = file.originalname;
  fileUpload.path = file.path;
  fileUpload.size = file.size;
  fileUpload.type = file.mimetype;
  fileUpload.save();

  res.json(toResJson({ data: fileUpload.idFile(), message: "Upload success" }));
});

router.get("/:id", async (req, res) => {
  const file = await FileUpload.findById(req.params.id);
  if (!file) {
    return res.json(
      toResJson({ status: "FAILED", message: "File not found", code: 404 })
    );
  }
  fs.readFile(file.path, { encoding: "binary" }, (err, data) => {
    if (err) {
      return res.json(
        toResJson({ status: "FAILED", message: "File not found", code: 404 })
      );
    }
    res.end(data, "binary");
  });
});

module.exports = router;
