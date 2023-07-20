import { prisma } from "@/lib/prismaClient";
import { ParamsType } from "@/types/api";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: ParamsType) => {
    const updateClick = async (id:string) => {
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
    try {
        const data = await prisma.url.findUnique({
            where: {
                generatedUrl: params.id,
            },
            select: {
                givenUrl: true,
                id: true,
            },
        });
        if (data?.givenUrl) {
            const { givenUrl } = data;
            await updateClick(data?.id);
            return NextResponse.json(givenUrl,{status: 200});
        } else {
            return NextResponse.json({msg: "Not Found"},{status: 404});
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
};


export const DELETE = async (req: NextRequest, { params }: ParamsType) => {
    const session = await getToken({ req });
    if (!session) {
        return NextResponse.json("Unauthorized", { status: 404 });
    }
    try {
        await prisma.url.delete({
            where: {
                id: params.id,
                createdById:session.sub
            },
        });
        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
};


