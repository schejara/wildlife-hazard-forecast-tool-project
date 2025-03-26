-- CreateTable
CREATE TABLE "bird_species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mass_g" DOUBLE PRECISION NOT NULL,
    "flocking_score" DOUBLE PRECISION NOT NULL,
    "wingspan_cm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bird_species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bird_species_name_key" ON "bird_species"("name");
