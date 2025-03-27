/*
  Warnings:

  - You are about to drop the column `relFrequency` on the `strike_history` table. All the data in the column will be lost.
  - You are about to drop the column `speciesId` on the `strike_history` table. All the data in the column will be lost.
  - You are about to drop the column `tileId` on the `strike_history` table. All the data in the column will be lost.
  - You are about to drop the `bird_species` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `relative_frequency` to the `strike_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species_id` to the `strike_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birds` to the `tile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "strike_history" DROP COLUMN "relFrequency",
DROP COLUMN "speciesId",
DROP COLUMN "tileId",
ADD COLUMN     "relative_frequency" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "species_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tile" ADD COLUMN     "birds" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "bird_species";

-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mass_g" DOUBLE PRECISION NOT NULL,
    "flocking_score" DOUBLE PRECISION NOT NULL,
    "wingspan_cm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "species"("name");

-- AddForeignKey
ALTER TABLE "strike_history" ADD CONSTRAINT "strike_history_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
