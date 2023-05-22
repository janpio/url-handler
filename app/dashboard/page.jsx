import DashboardTable from "./components/table";

const Dashboard = async () => {
    return (
        <div className="flex flex-col pb-10">
            <DashboardTable baseUrl={process.env.NEXTAUTH_URL} />
        </div>
    );
};

export default Dashboard;
