import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { urlCount, urlList } from "./lib/urlLists";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Dashboard=async()=> {
    const { user } = await getServerSession(authOptions);
    const urls = await urlList(user);
    const totalUrl = await urlCount(user);
    return (
      <div className="flex flex-col pb-10">
      <p>{"You have " + totalUrl + " urls"}</p>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Generated URL</th>
                        <th>Actual URL</th>
                        <th>Generated At</th>
                        <th>Last Access</th>
                        <th>Type</th>
                        <th>Total Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url, index) => (
                        <tr className="hover" key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`${process.env.NEXTAUTH_URL}/d/${url.generatedUrl}`}
                                    target="_blank"
                                >{`${process.env.NEXTAUTH_URL}/d/${url.generatedUrl}`}</Link>
                            </td>
                            <td><Link
                                    href={`${process.env.NEXTAUTH_URL}/d/${url.generatedUrl}`}
                                    target="_blank"
                                >{url.givenUrl}</Link></td>
                            <td>{url.createdAt.toString()}</td>
                            <td>{url.lastAccessedAt && url.lastAccessedAt.toString()}</td>
                            <td>{url.type}</td>
                            <td>{url.openedCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Dashboard