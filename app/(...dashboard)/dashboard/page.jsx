import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { urlList } from "@/app/utils/urlLists";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
    const { user } = await getServerSession(authOptions);
    const urls = await urlList(user);
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
            <thead>
      <tr>
        <th>No.</th>
        <th>Generated URL</th>
        <th>Actual URL</th>
        <th>Generated At</th>
      </tr>
    </thead>
    <tbody>
    {urls.map((url, index) => (
            <tr className="hover" key={index}>
              <td>{index+1}</td>
              <td>{`${process.env.NEXT_AUTH_URL}/d/${url.generatedUrl}`}</td>
              <td>{url.givenUrl}</td>
              <td>{url.createdAt.toString()}</td>
            </tr>
          ))}
    </tbody>
            </table>
           
        </div>
    );
}
