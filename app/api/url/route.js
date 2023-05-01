import prisma from "@/app/utils/prismaClient";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/client";

export async function POST(request) {
    const { url } = await request.json();
    const session = await getSession(context);
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

    try {
        const existingUrl = await prisma.url.findUnique({
            where: { url },
        });

        if (existingUrl) {
            return NextResponse.json(
                { message: "URL already exists" },
                { status: 400 }
            );
        }

        const newUrl = await prisma.url.create({
            data: {
                givenUrl,
                generatedUrl: generateShortUrl(),
                createdBy: session.user,
            },
        });
        return NextResponse.json(
            {
                message: "shortened URL created successfully",
                user: newUrl.generatedUrl,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
