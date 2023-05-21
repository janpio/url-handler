"use client";

import Link from "next/link";
import { urlDelete } from "../lib/url";

const DashboardTable = ({ urls, baseUrl }) => {
    return (
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url, index) => (
                        <tr className="hover" key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <Link
                                    href={`${baseUrl}/d/${url.generatedUrl}`}
                                    target="_blank"
                                >{`${baseUrl}/d/${url.generatedUrl}`}</Link>
                            </td>
                            <td>
                                <Link
                                    href={`${baseUrl}/d/${url.generatedUrl}`}
                                    target="_blank"
                                >
                                    {url.givenUrl}
                                </Link>
                            </td>
                            <td>{url.createdAt.toString()}</td>
                            <td>
                                {url.lastAccessedAt &&
                                    url.lastAccessedAt.toString()}
                            </td>
                            <td>{url.type}</td>
                            <td>{url.openedCount}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={async () => {
                                        await urlDelete(url);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardTable;
