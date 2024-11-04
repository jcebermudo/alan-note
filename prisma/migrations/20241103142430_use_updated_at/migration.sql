/*
  Warnings:

  - Changed the type of `useUpdatedAt` on the `Note` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "useUpdatedAt",
ADD COLUMN     "useUpdatedAt" TIMESTAMP(3) NOT NULL;
