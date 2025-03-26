-- CreateTable
CREATE TABLE "tile" (
    "id" SERIAL NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strike_history" (
    "id" SERIAL NOT NULL,
    "tileId" INTEGER NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "strikes" INTEGER NOT NULL,
    "relFrequency" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "strike_history_pkey" PRIMARY KEY ("id")
);
