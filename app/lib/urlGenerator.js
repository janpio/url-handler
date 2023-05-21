"use server";
import prisma from "./prismaClient";
import sendEmail from "./emailSender";
import { revalidatePath } from "next/cache";

const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
const googleDrivePattern =
    /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:uc\?id=|file\/d\/))(.*?)(?:\/.+)?(?:\?|$)/;
const dropboxPattern = /(?:https?:\/\/)?(?:www\.)?dropbox\.com\/(?:.+)\/(.+)/;
const megaPattern = /mega\.nz\/(#!|file\/|)[!a-zA-Z0-9_-]{8,}$/;

const urlGenerator = async (url, session) => {
    let newUrl = url;
    if (googleDrivePattern.test(url)) {
        newUrl = url.replace(/file\/d\/(.+?)\/.*$/, "uc?id=$1&export=download");
    } else if (dropboxPattern.test(url)) {
        newUrl = url.replace("dl=0", "dl=1");
    } else if (megaPattern.test(url)) {
        newUrl = "https://mega.nz/" + url.replace("mega.nz/", "#!") + "#mega";
    } else if (pattern.test(url) !== true) {
        //I should not
        newUrl = url;
    } else if (url !== "" || url === null) {
        newUrl = url;
    } else {
        throw new Error("Invalid URL");
    }
    try {
        const result = await prisma.url.create({
            data: {
                givenUrl: newUrl,
                generatedUrl: generateShortUrl(),
                createdById: session?.user?.id ?? null,
            },
        });
        process.env.NODE_ENV === "production" &&
            session &&
            (await sendEmail(
                session.user.email,
                "Your have shortened a new URL",
                `${process.env.NEXTAUTH_URL}/d/${result.generatedUrl}`
            ));

        return result.generatedUrl;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create URL");
    } finally {
        await prisma.$disconnect();
        revalidatePath("/dashboard");
    }
};

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

export default urlGenerator;
