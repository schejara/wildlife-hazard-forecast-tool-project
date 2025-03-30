import { PrismaClient, Species, StrikeHistory, TileBirds } from '../generated/prisma';
import { seedSpecies } from './data/species';
import { historyData } from './data/history';
import { tileLatLongData } from './data/tileLatLong';
import { tileBirdsData } from './data/tileBirds';

const prisma = new PrismaClient();

type SpeciesCreateInput = Omit<Species, 'id'>;
type HistoryCreateInput = Omit<StrikeHistory, 'id'>;
type TileBirdsCreateInput = Omit<TileBirds, 'id'>;

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
    console.log('Populating Species table with ', speciesData.length, ' records');
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
  console.log('Populating Strike History table with ', strikeHistoryData.length, ' records');
  await prisma.strikeHistory.createMany({ data: strikeHistoryData });
};

const seedTileBirdsTable = async () => {
  const tileCreateData: TileBirdsCreateInput[] = [];
  tileLatLongData.forEach((tileRow, index1) => {
    const birdRowData = tileBirdsData[index1];
    Object.entries(tileRow).forEach((tile) => {
      const [lat, long] = tile[1].split(',').map(Number);
      const [key] = tile;
      const birds = birdRowData[key as keyof typeof birdRowData] || '0';
      const numberOfBirds = Number(birds);
      tileCreateData.push({
        latitude: Number(lat),
        longitude: Number(long),
        altitude: 300,
        birds: numberOfBirds, 
      });
    })
  });
  // Filter out bad data where birds is not a number
  const validBirdRecords = tileCreateData.filter(record => record.birds >= 0);
  console.log('Populating Tile Birds table with ', validBirdRecords.length, ' records');
  await prisma.tileBirds.createMany({ data: validBirdRecords });
}

async function main() {
  const species = await seedSpeciesTable();
  await seedTileBirdsTable();
  await seedHistoryTable(species);
}

main()
  .then(async () => {
    console.log('Database seeding complete');
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
