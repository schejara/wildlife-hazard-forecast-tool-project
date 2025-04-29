import { PrismaClient, TileBirds } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getBirdCountByCoordinates = async (
  latitude: number,
  longitude: number,
  altitude: number
) => {
  const tile = await prisma.tileBirds.findFirst({
    where: {
      latitude,
      longitude,
      altitude,
    },
  });
  return tile?.birds;
};
