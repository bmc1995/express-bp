import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

//TODO create validation middleware / DTO defs
export default class UserController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await userService.findAll({
        include: {
          userPreference: true,
          favoritePosts: true,
          writtenPosts: true,
        },
        where: { deleted: false },
      });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundUser = await userService.find({
        where: { id },
        include: {
          userPreference: true,
          favoritePosts: true,
          writtenPosts: true,
        },
      });
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
      const foundUsers = await userService.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await userService.update({
        where: { id: req.params.id },
        data: { deleted: true },
      });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUsers = await userService.destroy({
        where: { id: req.params.id },
        include: { userPreference: true },
      });
      res.json({ foundUsers });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
