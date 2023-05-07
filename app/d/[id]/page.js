import kv from "@vercel/kv";
import { redirect } from "next/navigation";
import prisma from "@/app/utils/prismaClient";

export default async function FileDownloader({ params: { id } }) {
    const UrlDownloader = async () => {
        let data = await kv.get(id);
        if (!data) {
            try {
                const { givenUrl } = await prisma.Url.findFirst({
                    where: {
                        generatedUrl: id,
                    },
                    select: {
                        givenUrl: true,
                    },
                });
                if (givenUrl) {
                    return (data = await kv.set(id, givenUrl));
                } else {
                    return null;
                }
            } catch (err) {
                console.error(err);
                return err;
            } finally {
                await prisma.$disconnect();
            }
        } else {
            return data;
        }
    };
    const dt = await UrlDownloader();
    if (dt) {
        redirect(dt);
    } else {
        return <p>something went wrong</p>;
    }
}
