import { Request, Response, NextFunction } from "express";
import PostService from "../services/postService";

export default class PostController {
  private static postService: PostService;

  constructor(private InjectedService: PostService = new PostService()) {
    PostController.postService = this.InjectedService;
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const foundPosts = await this.postService.getAllPosts();
      res.json({ foundPosts });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async find(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundPost = await this.postService.findById(id);
      res.json({ foundPost });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newPost = await this.postService.create({ ...req.body });
      res.json({ newPost });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedPost = await this.postService.update({ ...req.body });
      res.json({ updatedPost });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async softDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedPost = await this.postService.softDelete(id);
      res.json({ deletedPost });
      return next();
    } catch (error) {
      return next(error);
    }
  }
  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const destroyedPost = await this.postService.destroy(id);
      res.json({ destroyedPost });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
