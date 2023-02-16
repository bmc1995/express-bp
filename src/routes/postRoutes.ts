import { Router } from "express";
import PostController from "../controllers/postController";
const postRouter = Router();
const postController = new PostController();

postRouter.get("/", (...args) => {
  postController.findAll(...args);
});
postRouter.post("/", (...args) => {
  postController.create(...args);
});
postRouter.get("/:id", (...args) => {
  postController.find(...args);
});
postRouter.patch("/:id", (...args) => {
  postController.update(...args);
});
postRouter.delete("/delete/:id", (...args) =>
  postController.softDelete(...args)
);

export default postRouter;
