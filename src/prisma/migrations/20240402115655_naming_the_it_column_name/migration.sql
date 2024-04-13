/*
  Warnings:

  - You are about to drop the column `it` on the `group` table. All the data in the column will be lost.
  - You are about to drop the column `groupIt` on the `group_contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `group` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "group_contact" DROP CONSTRAINT "group_contact_groupIt_fkey";

-- DropIndex
DROP INDEX "group_it_key";

-- AlterTable
ALTER TABLE "group" DROP COLUMN "it",
ADD COLUMN     "id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "group_contact" DROP COLUMN "groupIt",
ADD COLUMN     "groupId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "group_id_key" ON "group"("id");

-- AddForeignKey
ALTER TABLE "group_contact" ADD CONSTRAINT "group_contact_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
