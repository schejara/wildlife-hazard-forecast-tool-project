import { PrismaClient, StrikeHistory } from "../../generated/prisma";

const prisma = new PrismaClient();

export const getStrikeHistoryById = async (
  id: number
): Promise<StrikeHistory | null> => {
  const strikeHistory = await prisma.strikeHistory.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log(strikeHistory);
  return strikeHistory;
};

export const getStrikeHistoryByClosestDate = async (
  date: Date
): Promise<StrikeHistory[]> => {
//   const timezoneOffset = date.getTimezoneOffset();

  const dayStart = new Date(date);

  const dayEnd = new Date(date);
  dayEnd.setUTCHours(23, 59, 59, 999);

//   const dayStartUtc = new Date(dayStart.getTime() + timezoneOffset * 60000);
//   const dayEndUtc = new Date(dayEnd.getTime() + timezoneOffset * 60000);

  let strikeHistoryRows = await prisma.strikeHistory.findMany({
    where: {
      date: {
        gte: dayStart,
        lte: dayEnd,
      },
    },
  });

  if (strikeHistoryRows.length > 0) {
    return strikeHistoryRows;
  }

  const closestDate = new Date(date);

  const closestStrikeHistory = await prisma.strikeHistory.findMany({
    where: {
      date: {
        lt: closestDate,
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 1,
  });

  if (closestStrikeHistory.length === 0) {
    console.log("No previous data found.");
    return [];
  }

  const closestDateValue = closestStrikeHistory[0].date;

  strikeHistoryRows = await prisma.strikeHistory.findMany({
    where: {
      date: closestDateValue,
    },
  });

  return strikeHistoryRows;
};
