/*
  Warnings:

  - Added the required column `flockType` to the `species` table without a default value. This is not possible if the table is not empty.
  - Added the required column `altitude` to the `tile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "species" DROP COLUMN "flockType",
ADD COLUMN     "flockType" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "tile" ADD COLUMN     "altitude" DOUBLE PRECISION NOT NULL;

-- DropEnum
DROP TYPE "FlockType";
