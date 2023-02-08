import { Prisma } from "@prisma/client";
import prisma from "../database/client";

export async function find(args: Prisma.UserFindUniqueArgs) {
  const user = await prisma.user.findUnique(args);
  return user;
}
export async function findAll(args: Prisma.UserFindManyArgs) {
  const user = await prisma.user.findMany(args);
  return user;
}
export async function create(args: Prisma.UserCreateArgs) {
  const user = await prisma.user.create(args);
  return user;
}
export async function update(args: Prisma.UserUpdateArgs) {
  const user = await prisma.user.update(args);
  return user;
}
export async function destroy(args: Prisma.UserDeleteArgs) {
  const user = await prisma.user.delete(args);
  return user;
}
