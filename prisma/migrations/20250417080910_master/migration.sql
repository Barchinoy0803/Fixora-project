/*
  Warnings:

  - The `masterId` column on the `OrderMaster` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "OrderMaster" DROP CONSTRAINT "OrderMaster_masterId_fkey";

-- AlterTable
ALTER TABLE "OrderMaster" DROP COLUMN "masterId",
ADD COLUMN     "masterId" TEXT[];

-- AddForeignKey
ALTER TABLE "OrderMaster" ADD CONSTRAINT "OrderMaster_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
