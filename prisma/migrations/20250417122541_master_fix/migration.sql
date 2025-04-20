/*
  Warnings:

  - Added the required column `link` to the `Partners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partners" ADD COLUMN     "link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "IIN" DROP NOT NULL,
ALTER COLUMN "IIN" DROP DEFAULT,
ALTER COLUMN "MFO" DROP NOT NULL,
ALTER COLUMN "MFO" DROP DEFAULT,
ALTER COLUMN "RS" DROP NOT NULL,
ALTER COLUMN "RS" DROP DEFAULT,
ALTER COLUMN "BANK" DROP NOT NULL,
ALTER COLUMN "BANK" DROP DEFAULT,
ALTER COLUMN "OKED" DROP NOT NULL,
ALTER COLUMN "OKED" DROP DEFAULT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "address" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "star" DECIMAL(65,30) NOT NULL,
    "masterId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
