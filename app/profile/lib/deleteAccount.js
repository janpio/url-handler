"use server";

import prisma from "../../lib/prismaClient";

export const deleteAccount = async (id) => {
    try {
        await prisma.user.delete({
            where: {
                id: id,
            },
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await prisma.$disconnect();
    }
};
