import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prismaClient";
import sendEmail  from "@/lib/emailSender";
import { z } from "zod";
import { baseUrl } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
    const session = await getToken({ req });
    if (!session) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 404 });
    }
    try {
        const data = await prisma.url.findMany({
            where: {
                createdById: session.sub,
            },
        });
        const count = await prisma.url.count({
            where: {
                createdById: session.sub,
            },
        });
        const payload = { allUrls: data, count: count };
        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
};

export const POST = async (req: NextRequest) => {
    const session = await getToken({ req });
    const body = await req.json()
    const {url}=z.object({url:z.string()}).parse(body)
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
    const googleDrivePattern =
        /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:uc\?id=|file\/d\/))(.*?)(?:\/.+)?(?:\?|$)/;
    const dropboxPattern =
        /(?:https?:\/\/)?(?:www\.)?dropbox\.com\/(?:.+)\/(.+)/;
    const megaPattern = /mega\.nz\/(#!|file\/|)[!a-zA-Z0-9_-]{8,}$/;
    let newUrl = url;
    if (googleDrivePattern.test(url)) {
        newUrl = url.replace(/file\/d\/(.+?)\/.*$/, "uc?id=$1&export=download");
    } else if (dropboxPattern.test(url)) {
        newUrl = url.replace("dl=0", "dl=1");
    } else if (megaPattern.test(url)) {
        newUrl = "https://mega.nz/" + url.replace("mega.nz/", "#!") + "#mega";
    } else if (pattern.test(url) !== true) {
        newUrl = url;
    } else if (url !== "" || url === null) {
        newUrl = url;
    } else {
        throw new Error("Invalid URL");
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
    try {
        const result = await prisma.url.create({
            data: {
                givenUrl: newUrl,
                generatedUrl: generateShortUrl(),
                createdById: session?.sub
            },select:{generatedUrl:true}
        });
        process.env.NODE_ENV === "production" &&
            (await sendEmail(
                session?.email as string,
                "Your have shortened a new URL",
                `${baseUrl}/d/${result.generatedUrl}`
            ));
        return NextResponse.json(`${baseUrl}/d/${result.generatedUrl}`, { status: 200 });
    } catch (error) {
        NextResponse.json({ msg: "Invalid URL" }, { status: 404 });
    } finally {
        await prisma.$disconnect();
    }
};


