import prisma from "./prismaClient";

export const urlList = async ({ id }) => {
    try {
        return await prisma.url.findMany({
            where: {
                createdById: id,
            },
        });
    } finally {
        await prisma.$disconnect();
    }
};
