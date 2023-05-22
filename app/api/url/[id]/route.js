import prisma from "@/app/lib/prismaClient";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const DELETE = async (req, res) => {
    const token = await getToken({ req });
    if (token) {
        try {
            const data = await prisma.url.delete({
                where: {
                    id: res.params.id,
                },
            });
            return NextResponse.json({ status: "ok" });
        } catch (error) {
            console.log(error);
            return NextResponse.error();
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return NextResponse.error();
    }
};
