import { PrismaClient, Species } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getSpeciesByName = async (name: string) => {
  const species = await prisma.species.findUnique({
    where: {
      name,
    },
  });
  console.log(species);
  return species;
};

export const getSpeciesById = async (id: number): Promise<Species | null> => {
  const species = await prisma.species.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log(species);
  return species;
};

export const getSpeciesByDate = async (date: Date): Promise<Species[]> => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const strikes = await prisma.strikeHistory.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      species: true,
    },
  });

  return strikes.map((strike) => strike.species);
};
