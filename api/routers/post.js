const { Router } = require("express");

const postController = require("../controllers/post.js");
const authenticator = require("../middleware/authenticator");

const postRouter = Router();

postRouter.get("/", authenticator, postController.index);
postRouter.post("/", postController.create);
postRouter.get("/search", postController.show);
postRouter.delete("/:id", postController.destroy);
postRouter.patch("/:id", postController.update); //added patch route

module.exports = postRouter;
