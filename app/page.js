import { getServerSession } from "next-auth";
import UrlHandler from "./component/urlHandler";
import { Analytics } from "@vercel/analytics/react";
import { authOptions } from "./api/auth/[...nextauth]/route";
export default async function Home() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <UrlHandler session={session} />
            <Analytics />
        </>
    );
}
