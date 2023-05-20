import prisma from "@/app/lib/prismaClient";

export const UrlDownloader = async (id) => {
    try {
        const data = await prisma.url.findFirst({
            where: {
                generatedUrl: id,
            },
            select: {
                givenUrl: true,
                id: true,
            },
        });
        if (data?.givenUrl) {
            const { givenUrl } = data;
            await updateClick(data?.id);
            return givenUrl;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        return { error: "An error occurred" };
    } finally {
        await prisma.$disconnect();
    }
};

const updateClick = async (id) => {
    try {
        return await prisma.url.update({
            where: {
                id: id,
            },
            data: {
                openedCount: {
                    increment: 1,
                },
                lastAccessedAt: {
                    set: new Date(),
                },
            },
        });
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
};
