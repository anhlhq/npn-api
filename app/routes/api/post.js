const router = require("express").Router();
const middlewares = require("./middlewares");
const postController = require("../../controllers/post");

router.get("/", middlewares.authenticate, postController.getAll);
router.get("/:id", middlewares.authenticate, postController.getOne);
router.post("/", middlewares.authenticate, postController.createOrUpdate);
router.post("/:id", middlewares.authenticate, postController.createOrUpdate);
router.delete("/:id", middlewares.authenticate, postController.delete);

module.exports = router;
