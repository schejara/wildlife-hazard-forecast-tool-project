/*
  Warnings:

  - Added the required column `altitude` to the `tile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tile" ADD COLUMN     "altitude" DOUBLE PRECISION NOT NULL;
