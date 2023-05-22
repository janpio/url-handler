import prisma from "@/app/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export const GET = async (req, res) => {
    const token = (await getToken({ req })) ?? null;
    const session = (await getServerSession(authOptions)) ?? null;
    if (session) {
        try {
            const data = await prisma.url.findMany({
                where: {
                    createdById: session.user.id,
                },
            });
            const count = await prisma.url.count({
                where: {
                    createdById: session.user.id,
                },
            });
            const payload = { allUrls: data, count: count };
            return NextResponse.json(payload);
        } catch (error) {
            return NextResponse.error();
        } finally {
            await prisma.$disconnect();
        }
    } else if (token) {
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
