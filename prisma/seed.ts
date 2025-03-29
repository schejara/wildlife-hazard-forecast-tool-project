import { PrismaClient, Species, StrikeHistory } from '../generated/prisma';
import { seedSpecies } from './data/species';
import { historyData } from './data/history';

const prisma = new PrismaClient();

type SpeciesCreateInput = Omit<Species, 'id'>;
type HistoryCreateInput = Omit<StrikeHistory, 'id'>;

const getMonthIndexFromMonthName = (monthName: string): number => {
  switch (monthName) {
    case 'Feb':
      return 1;
    case 'Mar':
      return 2;
    case 'Apr':
      return 3;
    case 'May':
      return 4;
    case 'Jun':
      return 5;
    case 'Jul':
      return 6;
    case 'Aug':
      return 7;
    case 'Sep':
      return 8;
    case 'Oct':
      return 9;
    case 'Nov':
      return 10;
    case 'Dec':
      return 11;
    default:
      return 0;
  }
}

const getDayFromWeekIndex = (weekIndex: number): number => {
  switch (weekIndex) {
    case 2:
      return 8;
    case 3:
      return 15;
    case 4:
      return 22; 
    default:
      return 1;
  }
}

const seedSpeciesTable = async (): Promise<any> => {
    const speciesData: SpeciesCreateInput[] = seedSpecies.map(speciesRecord => {
      const { name, mass, flockingScore, flockType, wingspan } = speciesRecord;
      return {
        name,
        mass: Number(mass),
        flockingScore: Number(flockingScore),
        flockType: Number(flockType),
        wingspan: Number(wingspan),
      };
    });
    const savedSpecies = await prisma.species.createManyAndReturn({
      select: { id: true, name: true },
      data: speciesData,
    });
    return savedSpecies;
};

const seedHistoryTable = async (savedSpeciesIds: { id: number, name: string }[]) => {
  const strikeHistoryData: HistoryCreateInput[] = [];

  historyData.forEach(historyRecord => {
    const { month, week, species, freq, strikes } = historyRecord;
    const monthIndex = getMonthIndexFromMonthName(month);
    const day = getDayFromWeekIndex(Number(week));
    const date = new Date(2014, monthIndex, day);
    const savedSpecies = savedSpeciesIds.find(spec => spec.name === species);
    if (savedSpecies) {
      strikeHistoryData.push({
          speciesId: savedSpecies?.id,
          date,
          frequency: parseFloat(freq.replace('%', '')) / 100,
          strikes: Number(strikes),
      });
    }
  });
  await prisma.strikeHistory.createMany({ data: strikeHistoryData });
};

async function main() {
  const species = await seedSpeciesTable();
  await seedHistoryTable(species);
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
