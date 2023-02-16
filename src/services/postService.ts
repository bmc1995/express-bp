import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../database/client";
import PostRepository from "../database/repositories/PostRepository";

interface PostCreateArgs {
  title: string;
  authorId: string;
  content: string;
  categories: string[];
}
interface PostUpdateArgs {
  title: string;
  authorId?: string;
  postId: string;
  content: string;
  categories: string[];
  deleted: boolean;
}

export default class PostService {
  constructor(
    private repo: PostRepository = new PostRepository(prismaClient)
  ) {}
  async findById(id: string) {
    const post = await this.repo.find({
      where: { id },
    });
    return post;
  }
  async getAllPosts() {
    const posts = await this.repo.findAll({
      include: {
        author: true,
        categories: true,
        favoritedBy: true,
        _count: true,
      },
    });
    return posts;
  }
  async create(args: PostCreateArgs) {
    const { title, authorId, content, categories } = args;
    const post = await this.repo.create({
      data: {
        author: { connect: { id: authorId } },
        title,
        content,
        averageRating: 0,
        categories: {
          connectOrCreate: categories.map((name) => {
            return { where: { name }, create: { name } };
          }),
        },
      },
    });
    return post;
  }

  async update(args: PostUpdateArgs) {
    const { categories, content, title, postId, deleted } = args;
    const post = await this.repo.update({
      where: { id: postId },
      data: {
        content,
        title,
        deleted,
        categories: {
          connectOrCreate: categories.map((name) => {
            return { where: { name }, create: { name } };
          }),
        },
      },
    });
    return post;
  }

  async softDelete(id: string) {
    const softDeleted = await this.repo.update({
      where: { id },
      data: { deleted: true },
    });

    return softDeleted;
  }

  async destroy(id: string) {
    const deleted = await this.repo.destroy({ where: { id } });

    return deleted;
  }
}
