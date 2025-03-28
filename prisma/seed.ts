import { PrismaClient, Species } from '../generated/prisma';
import { seedSpecies } from './data/species';

const prisma = new PrismaClient();

type SpeciesCreateInput = Omit<Species, 'id'>

const seedSpeciesTable = async () => {
    const speciesData: SpeciesCreateInput[] = seedSpecies.map(speciesRecord => {
      const { species, mass, flockingScore, flockType, wingspan } = speciesRecord;
      return {
        name: species,
        mass: Number(mass),
        flockingScore: Number(flockingScore),
        flockType: Number(flockType),
        wingspan: Number(wingspan),
      };
    });
    await prisma.species.createMany({ data: speciesData });    
};

async function main() {
    await seedSpeciesTable();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
