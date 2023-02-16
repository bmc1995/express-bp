import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../client";

export default class PostRepository {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async find(args: Prisma.PostFindUniqueArgs) {
    return this.prisma.post.findUnique(args);
  }
  async findAll(args: Prisma.PostFindManyArgs) {
    return this.prisma.post.findMany(args);
  }
  async create(args: Prisma.PostCreateArgs) {
    return this.prisma.post.create(args);
  }
  async update(args: Prisma.PostUpdateArgs) {
    return this.prisma.post.update(args);
  }
  async destroy(args: Prisma.PostDeleteArgs) {
    return this.prisma.post.delete(args);
  }
}
