import { redirect } from "next/navigation";

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

    if (url?.givenUrl) {
        return redirect(url?.givenUrl);
    } else {
        return <p> something went wrong</p>;
    }
}
