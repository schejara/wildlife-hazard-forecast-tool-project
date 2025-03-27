import { PrismaClient, Species } from '../../generated/prisma';

const prisma = new PrismaClient();

export const getSpeciesByName = async (name: string) => {
    const species = await prisma.species.findUnique({
        where: {
            name,
        },
    });
    console.log(species);
    return species;
}

export const getSpeciesById = async (id: number): Promise<Species|null> => {
    const species = await prisma.species.findUnique({
        where: {
            id: Number(id),
        },
    });
    console.log(species);
    return species;
}
