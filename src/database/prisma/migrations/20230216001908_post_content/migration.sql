/*
  Warnings:

  - You are about to drop the column `blob` on the `User` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "averageRating" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "blob";
