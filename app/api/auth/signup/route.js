import prisma from "@/app/utils/prismaClient";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "Email already in use" },
                { status: 400 }
            );
        }

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: newUser.id,
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
