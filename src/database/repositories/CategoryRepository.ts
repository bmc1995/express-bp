import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../client";

export default class CategoryRepository {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async find(args: Prisma.CategoryFindUniqueArgs) {
    return this.prisma.category.findUnique(args);
  }
  async findAll(args: Prisma.CategoryFindManyArgs) {
    return this.prisma.category.findMany(args);
  }
  async create(args: Prisma.CategoryCreateArgs) {
    return this.prisma.category.create(args);
  }
  async update(args: Prisma.CategoryUpdateArgs) {
    return this.prisma.category.update(args);
  }
  async destroy(args: Prisma.CategoryDeleteArgs) {
    return this.prisma.category.delete(args);
  }
}
