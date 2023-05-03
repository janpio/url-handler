"use server";
import prisma from "@/app/utils/prismaClient";

export default async function UrlDownloader(url) {
    try {
        return await prisma.Url.findFirst({
            where: {
                generatedUrl: url.replace("/", ""),
            },
            select: {
                givenUrl: true,
            },
        });
    } catch (err) {
        console.error(err);
        return err;
    } finally {
        await prisma.$disconnect();
    }
}
