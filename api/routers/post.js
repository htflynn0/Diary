const { Router } = require("express");

const postController = require("../controllers/post.js");
const authenticator = require("../middleware/authenticator");

const postRouter = Router();

postRouter.get("/", postController.index);
postRouter.get("/:title", postController.show);
postRouter.post("/", postController.create);
postRouter.get("/search", postController.show);
postRouter.delete("/:title", postController.destroy);
postRouter.patch("/:title", postController.update); //added patch route

module.exports = postRouter;
