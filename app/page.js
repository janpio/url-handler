import { getServerSession } from "next-auth";
import UrlHandler from "./component/urlHandler";
import { urlGenerator } from "./utils/urlGenerator";
export default async function Home() {
    const session = await getServerSession();
    return (
        <main>
            <p className="text-end">{session?.user?.email ?? "Guest"}</p>
            <UrlHandler fn={urlGenerator} session={session} />
        </main>
    );
}
