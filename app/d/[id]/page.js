import { notFound, redirect } from "next/navigation";
import { UrlDownloader } from "./lib";

const FileDownloader = async ({ params: { id } }) => {
    const link = await UrlDownloader(id);
    if (link) {
        redirect(link);
    } else {
        notFound();
    }
};

export default FileDownloader;
