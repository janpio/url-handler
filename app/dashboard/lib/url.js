"use server";

import prisma from "@/app/lib/prismaClient";
import { revalidatePath } from "next/cache";

export const urlList = async ({ id }) => {
    try {
        return await prisma.url.findMany({
            where: {
                createdById: id,
            },
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const urlCount = async ({ id }) => {
    try {
        return await prisma.url.count({
            where: {
                createdById: id,
            },
        });
    } finally {
        await prisma.$disconnect();
    }
};

export const urlDelete = async ({ id }) => {
    try {
        return await prisma.url.delete({
            where: {
                id: id,
            },
        });
    } finally {
        await prisma.$disconnect();
        revalidatePath("/dashboard");
    }
};
