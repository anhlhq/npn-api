const router = require("express").Router();
const middlewares = require("./middlewares");
const postController = require("../../controllers/post");

router.get("/", postController.getAll);
router.get("/:id", postController.getOne);
router.post("/", middlewares.authenticate, postController.createOrUpdate);
router.post("/:id", middlewares.authenticate, postController.createOrUpdate);
router.delete("/:id", middlewares.authenticate, postController.delete);

module.exports = router;
