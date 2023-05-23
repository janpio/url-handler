"use client";
import Link from "next/link";
import baseUrl from "../lib/url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

const Dashboard = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["urlData"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/api/url`);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return await res.json();
        },
    });
    const deleteUrl = useMutation({
        mutationFn: async (id) => {
            return await fetch(`${baseUrl}/api/url/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["urlData"]);
        },
    });
    const loading = (
        <div className="flex flex-col pb-10">
            <div className="w-64 h-4 bg-neutral rounded-full animate-pulse mb-2" />
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
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <tr className="hover" key={index}>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    const body = (
        <div className="flex flex-col pb-10">
            <p className="mb-2">You have {data?.count ?? 0} urls</p>
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

                    {data?.allUrls?.length === 0 ? (
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
                            {data?.allUrls?.map((url, index) => (
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
                                                deleteUrl.mutate(url.id)
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
    if (isError) {
        return (
            <div>
                <p>Something went wrong</p>
            </div>
        );
    } else if (isLoading) {
        return loading;
    }
    return <Suspense fallback={loading}>{body}</Suspense>;
};

export default Dashboard;
