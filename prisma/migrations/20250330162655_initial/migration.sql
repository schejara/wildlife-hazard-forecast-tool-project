-- CreateTable
CREATE TABLE "species" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mass_g" DOUBLE PRECISION NOT NULL,
    "flocking_score" DOUBLE PRECISION NOT NULL,
    "flockType" DOUBLE PRECISION NOT NULL,
    "wingspan_cm" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tile_birds" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "birds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tile_birds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strike_history" (
    "id" SERIAL NOT NULL,
    "species_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "strikes" INTEGER NOT NULL,
    "relative_frequency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "strike_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "species_name_key" ON "species"("name");

-- AddForeignKey
ALTER TABLE "strike_history" ADD CONSTRAINT "strike_history_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
