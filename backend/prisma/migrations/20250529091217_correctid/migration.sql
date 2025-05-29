/*
  Warnings:

  - You are about to drop the column `useId` on the `Accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_useId_fkey";

-- DropIndex
DROP INDEX "Accounts_useId_key";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "useId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_userId_key" ON "Accounts"("userId");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
