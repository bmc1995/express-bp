import { Prisma, PrismaClient } from "@prisma/client";
import prismaClient from "../database/client";
import UserRepository from "../database/repositories/UserRepository";
export default class UserService {
  constructor(
    private repo: UserRepository = new UserRepository(prismaClient)
  ) {}
  async findById(id: string) {
    const user = await this.repo.find({
      where: { id },
      include: {
        writtenPosts: true,
        favoritePosts: true,
        userPreference: true,
        _count: true,
      },
    });
    return user;
  }
  async getAllUsers() {
    const user = await this.repo.findAll({
      include: {
        writtenPosts: true,
        favoritePosts: true,
        userPreference: true,
        _count: true,
      },
    });
    return user;
  }
  async create(args: Prisma.UserCreateArgs) {
    const { age, email, name, title, blob, deleted, favoritePosts, role } =
      args.data;
    const user = await this.repo.create({
      data: {
        age,
        email,
        name,
        title,
        blob,
        deleted,
        favoritePosts,
        role,
        userPreference: { create: { emailUpdates: false } },
      },
    });
    return user;
  }
  async updateById(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.repo.update({
      where: { id },
      data,
      include: {
        userPreference: true,
        favoritePosts: true,
        writtenPosts: true,
      },
    });
    return user;
  }
  async destroy(id: string) {
    const user = await this.repo.destroy({
      where: { id },
      include: { userPreference: true },
    });
    return user;
  }
}
