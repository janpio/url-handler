"use server";
import prisma from "@/app/utils/prismaClient";

const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
const googleDrivePattern =
    /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:uc\?id=|file\/d\/))(.*?)(?:\/.+)?(?:\?|$)/;
const dropboxPattern = /(?:https?:\/\/)?(?:www\.)?dropbox\.com\/(?:.+)\/(.+)/;
const megaPattern = /mega\.nz\/(#!|file\/|)[!a-zA-Z0-9_-]{8,}$/;
const onedrivePattern = /1drv\.ms\/(u\/s\/|s\/)[!a-zA-Z0-9_-]{15,}$/;
const boxPattern = /app\.box\.com\/s\/[a-zA-Z0-9_-]+$/;
const icloudPattern = /www\.icloud\.com\/.*$/;
const wetransferPattern = /wetransfer\.com\/downloads\/[a-zA-Z0-9]{10}$/;

export async function urlGenerator(url, session) {
    let newUrl = url;
    if (googleDrivePattern.test(url)) {
        newUrl = url.replace(/file\/d\/(.+?)\/.*$/, "uc?id=$1&export=download");
    } else if (dropboxPattern.test(url)) {
        newUrl = url.replace("dl=0", "dl=1");
    } else if (megaPattern.test(url)) {
        newUrl = "https://mega.nz/" + url.replace("mega.nz/", "#!") + "#mega";
    } else if (onedrivePattern.test(url)) {
        newUrl = newUrl.replace("1drv.ms/", "1drv.ws/");
    } else if (boxPattern.test(url)) {
        newUrl = newUrl.replace("app.box.com/", "app.box.com/index.php");
    } else if (icloudPattern.test(url)) {
        newUrl = url.replace("www.icloud.com/", "www.icloud.com/");
    } else if (wetransferPattern.test(url)) {
        newUrl = url + "/download";
    } else if (pattern.test(url) !== true) {
        throw new Error("Invalid URL");
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
        });
        const result = await prisma.url.create({
            data: {
                givenUrl: newUrl,
                generatedUrl: generateShortUrl(),
                createdById: user.id ?? null,
            },
        });
        return result.generatedUrl;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create URL");
    } finally {
        await prisma.$disconnect();
    }
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
