import { getServerSession } from "next-auth";
import UrlHandler from "./component/urlHandler";
import { Analytics } from "@vercel/analytics/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

const Home = async () => {
    const session = await getServerSession(authOptions);
    return (
        <>
            <UrlHandler session={session} />
            <Analytics />
        </>
    );
};

export default Home;
