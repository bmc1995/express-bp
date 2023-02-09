import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();

userRouter.get("/", UserController.findAll);
userRouter.post("/", UserController.create);
userRouter.get("/:id", UserController.findOne);
userRouter.patch("/:id", UserController.update);
userRouter.patch("/delete/:id", UserController.softDelete);

export default userRouter;
