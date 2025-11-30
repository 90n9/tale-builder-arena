/*
  Warnings:

  - You are about to drop the column `estimatedPlayTime` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `supportedLang` on the `Story` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "estimatedPlayTime",
DROP COLUMN "supportedLang",
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "subtitle" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT;
