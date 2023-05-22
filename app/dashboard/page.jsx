"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import baseUrl from "../lib/url";

const Dashboard = () => {
    const [data, setData] = useState({ allUrls: [], count: 0 });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/url`, {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                setData(await res.json());
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUrl = async (id) => {
        try {
            await fetch(`${baseUrl}/api/url/${id}`, { method: "DELETE" });
            setData({
                allUrls: data.allUrls.filter((url) => url.id !== id),
                count: data.count - 1,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col pb-10">
            <p className="mb-2">You have {data?.count} urls</p>
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

                    {data.allUrls.length === 0 ? (
                        <tbody>
                            <tr className="hover">
                                <td>
                                    <div className="w-4 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-72 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-72 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-56 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-56 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-12 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <div className="w-4 h-4 bg-neutral rounded-full animate-pulse" />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-disabled cursor-not-allowed opacity-50"
                                        disabled
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {data.allUrls.map((url, index) => (
                                <tr className="hover" key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link
                                            href={`${baseUrl}/d/${url.generatedUrl}`}
                                            target="_blank"
                                        >
                                            {`${baseUrl}/d/${url.generatedUrl}`}
                                        </Link>
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
                                            onClick={() =>
                                                handleDeleteUrl(url.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
