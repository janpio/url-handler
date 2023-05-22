import prisma from "@/app/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const token = await getToken({ req });
    if (token) {
        try {
            const data = await prisma.url.findMany({
                where: {
                    createdById: token.id,
                },
            });
            const count = await prisma.url.count({
                where: {
                    createdById: token.id,
                },
            });
            const payload = { allUrls: data, count: count };
            return NextResponse.json(payload);
        } catch (error) {
            return NextResponse.error();
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.error();
    }
};
