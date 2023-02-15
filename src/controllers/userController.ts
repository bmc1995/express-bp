import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService";

//TODO create validation middleware / DTO defs
export default class UserController {
  private static userService: UserService;

  constructor(private injectedService: UserService = new UserService()) {
    UserController.userService = this.injectedService;
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await this.userService.getAllUsers();
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUser = await this.userService.findById(id);
      res.json({ foundUser });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

      const createdUser = await this.userService.create({
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
      const foundUsers = await this.userService.updateById(id, data);
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUsers = await this.userService.updateById(id, {
        deleted: true,
      });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUsers = await this.userService.destroy(id);
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
