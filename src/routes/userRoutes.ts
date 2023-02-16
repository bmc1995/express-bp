import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();
const userController = new UserController();

userRouter.get("/", (...args) => {
  userController.findAll(...args);
});
userRouter.post("/", (...args) => {
  userController.create(...args);
});
userRouter.get("/:id", (...args) => {
  userController.find(...args);
});
userRouter.patch("/:id", (...args) => {
  userController.update(...args);
});
userRouter.delete("/delete/:id", (...args) => {
  userController.softDelete(...args);
});

export default userRouter;
