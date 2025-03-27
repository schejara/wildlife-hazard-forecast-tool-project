/*
  Warnings:

  - Added the required column `flockType` to the `species` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FlockType" AS ENUM ('CLUMP', 'LINE');

-- AlterTable
ALTER TABLE "species" ADD COLUMN     "flockType" "FlockType" NOT NULL;
