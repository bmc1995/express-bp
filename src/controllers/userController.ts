import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";
const userService = new UserService();

//TODO create validation middleware / DTO defs
export default class UserController {
  constructor(private userService: UserService = userService) {}
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await userService.getAllUsers();
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUser = await userService.findById(id);
      res.json({ foundUser });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const createdUser = await userService.create({
        data: {
          userPreference: { create: { emailUpdates: false } },
          ...req.body,
        },
      });
      res.json({ createdUser });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = req.body;
      const { id } = req.params;
      const foundUsers = await userService.updateById(id, data);
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUsers = await userService.updateById(id, { deleted: true });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUsers = await userService.destroy(id);
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
