import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../client";

export default class UserRepository {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async find(args: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(args);
  }
  async findAll(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args);
  }
  async create(args: Prisma.UserCreateArgs) {
    return this.prisma.user.create(args);
  }
  async update(args: Prisma.UserUpdateArgs) {
    return this.prisma.user.update(args);
  }
  async destroy(args: Prisma.UserDeleteArgs) {
    return this.prisma.user.delete(args);
  }
}
