import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { urlCount, urlList } from "./lib/url";
import { getServerSession } from "next-auth";
import DashboardTable from "./components/table";

const Dashboard = async () => {
    const { user } = await getServerSession(authOptions);
    const totalUrl = await urlCount(user);
    return (
        <div className="flex flex-col pb-10">
            <p>{"You have " + totalUrl + " urls"}</p>
            <DashboardTable urls={await urlList(user)} baseUrl={process.env.NEXTAUTH_URL} />
        </div>
    );
};

export default Dashboard;
