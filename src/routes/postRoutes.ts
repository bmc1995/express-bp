import { Router } from "express";
import PostController from "../controllers/postController";
const postRouter = Router();

postRouter.get("/", PostController.findAll);
postRouter.post("/", PostController.create);
postRouter.get("/:id", PostController.find);
postRouter.patch("/:id", PostController.update);
postRouter.patch("/delete/:id", PostController.softDelete);

export default postRouter;
