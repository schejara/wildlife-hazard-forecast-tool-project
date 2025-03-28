import { PrismaClient } from "../generated/prisma"; 
import { historyData } from './data/history';

const prisma = new PrismaClient();

type HistoryCreateInput = {
    month: string;
    week: number;
    species: string;
    freq: number;
    strikes: number;
  };

  const seedHistoryTable = async () => {
    const strikeHistoryData: HistoryCreateInput[] = historyData.map(historyRecord => {
      const { Month, Week, Species, Freq, Strikes } = historyRecord;
  
      return {
        month: Month,
        week: Number(Week),
        species: Species,
        freq: parseFloat(Freq.replace('%', '')) / 100,
        strikes: Number(Strikes),
      };
    });
  
    await prisma.strikeHistory.createMany({ data: strikeHistoryData });
  };

  async function main() {
    await seedHistoryTable();
  }
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });