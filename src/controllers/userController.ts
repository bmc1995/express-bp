import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export default class UserController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await userService.findAll({});
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
