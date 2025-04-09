import { PrismaClient, StrikeHistory } from '../../generated/prisma';

const prisma = new PrismaClient();

export const getStrikeHistoryById = async (id: number): Promise<StrikeHistory|null> => {
    const strikeHistory = await prisma.strikeHistory.findUnique({
        where: {
            id: Number(id),
        },
    });
    console.log(strikeHistory);
    return strikeHistory;
}