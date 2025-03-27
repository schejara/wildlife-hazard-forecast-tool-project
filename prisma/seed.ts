import { FlockType, PrismaClient, Species } from '../generated/prisma';
import { seedSpecies } from './data/species';

const prisma = new PrismaClient();

type SpeciesCreateInput = Omit<Species, 'id'>

const seedSpeciesTable = async () => {
    const speciesData: SpeciesCreateInput[] = seedSpecies.map(speciesRecord => {
      const { species, mass, flockingScore, flockType, wingspan} = speciesRecord;
      let fType: FlockType | null = null;
      switch (flockType.toLowerCase()) {
        case 'clump':
          fType = FlockType.CLUMP;
          break;
        case 'line/v': 
          fType = FlockType.LINE;
          break;
      }
      return {
        name: species,
        mass: Number(mass),
        flockingScore: Number(flockingScore),
        flockType: fType,
        wingspan: Number(wingspan),
      };
    });
    console.log(speciesData);
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
