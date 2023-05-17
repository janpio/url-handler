import { notFound, redirect } from "next/navigation";
import UrlDownloader from "./lib";

export default async function FileDownloader({ params: { id } }) {
    const link = await UrlDownloader(id);
    console.log(link);
    if (link) {
        redirect(link);
    } else {
        notFound();
    }
}
