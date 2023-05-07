"use server";
import prisma from "@/app/utils/prismaClient";

export async function urlGenerator(url, session) {
    if (typeof url !== "string") {
        throw new Error("Invalid URL");
    }
    const newUrl = url.replace(
        /file\/d\/(.+?)\/.*$/,
        "uc?id=$1&export=download"
    );
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });
        const result = await prisma.url.create({
            data: {
                givenUrl: newUrl,
                generatedUrl: generateShortUrl(),
                createdById: user.id,
            },
        });
        return result.generatedUrl;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create URL");
    } finally {
        await prisma.$disconnect();
    }
}

const generateShortUrl = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
};
