"use server";
import prisma from "@/app/utils/prismaClient";
import { hash } from "bcrypt";
const CreateUser = async (email, password) => {
    const hashedPassword = await hash(password, 10);
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                error: true,
                message: "Email already in use",
            };
        }

        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return {
            error: false,
            message: "User created successfully",
            user: newUser.id,
        };
    } catch (error) {
        console.error(error);
        return { error: true, message: "Something went wrong" };
    } finally {
        await prisma.$disconnect();
    }
};

export default CreateUser;
