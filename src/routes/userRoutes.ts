import { Router } from "express";
import UserController from "../controllers/userController";
const userRouter = Router();

userRouter.get("/", UserController.findAll);

export default userRouter;
