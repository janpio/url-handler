import { redirect } from "next/navigation";
import prisma from "@/app/utils/prismaClient";

export default async function FileDownloader({ params: { id } }) {
    const UrlDownloader = async () => {
        try {
            return await prisma.Url.findFirst({
                where: {
                    generatedUrl: id,
                },
                select: {
                    givenUrl: true,
                },
            });
        } catch (err) {
            console.error(err);
            return err;
        } finally {
            await prisma.$disconnect();
        }
    };

    const { givenUrl } = await UrlDownloader();
    if (givenUrl) {
        redirect("/");
    } else {
        return <p>something went wrong</p>;
    }
}
