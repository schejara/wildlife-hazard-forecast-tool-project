/*
  Warnings:

  - You are about to drop the `tile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tile";

-- CreateTable
CREATE TABLE "tile_birds" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "birds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tile_birds_pkey" PRIMARY KEY ("id")
);
