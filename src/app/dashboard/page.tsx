"use client";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { baseUrl } from "@/lib/utils";

type Url = {
    id: string;
    generatedUrl: string;
    givenUrl: string;
    createdAt: Date;
    lastAccessedAt: Date | null;
    openedCount: number;
    type: "PUBLIC" | "PRIVATE";
};
const Dashboard = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["url"],
        queryFn: async () => {
            const res = await axios.get("/api/url");
            return res.data;
        },
        staleTime: 50000,
    });
    const deleteUrl = useMutation({
        mutationFn: async (id: string) => {
            return await axios.delete(`/api/url/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["url"]);
            toast({ title: "Success", description: "URL deleted" });
        },
    });
    const loading = (
        <div className="flex flex-col mt-10">
            <Skeleton className="my-8 w-72 h-4" />
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Generated URL</TableHead>
                            <TableHead>Actual URL</TableHead>
                            <TableHead>Generated At</TableHead>
                            <TableHead>Last Access</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Total Clicks</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="w-4 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-72 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-72 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-56 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-56 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-12 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="w-12 h-4" />
                                </TableCell>
                                <TableCell>
                                    <Button disabled>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
    const body = (
        <div className="flex flex-col mt-10">
            <p className="my-8">You have {data?.count ?? 0} urls</p>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Generated URL</TableHead>
                            <TableHead>Actual URL</TableHead>
                            <TableHead>Generated At</TableHead>
                            <TableHead>Last Access</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Total Clicks</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.allUrls?.map(
                            (
                                {
                                    id,
                                    generatedUrl,
                                    givenUrl,
                                    createdAt,
                                    lastAccessedAt,
                                    openedCount,
                                    type,
                                }: Url,
                                index: number
                            ) => (
                                <TableRow className="hover" key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Link
                                            onClick={() => {
                                                queryClient.invalidateQueries([
                                                    "url",
                                                ]);
                                            }}
                                            href={`/d/${generatedUrl}`}
                                            target="_blank"
                                        >
                                            {`${baseUrl}/d/${generatedUrl}`}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            onClick={() => {
                                                queryClient.invalidateQueries([
                                                    "url",
                                                ]);
                                            }}
                                            href={`/d/${generatedUrl}`}
                                            target="_blank"
                                        >
                                            {givenUrl}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {createdAt.toString()}
                                    </TableCell>
                                    <TableCell>
                                        {lastAccessedAt &&
                                            lastAccessedAt.toString()}
                                    </TableCell>
                                    <TableCell>{type}</TableCell>
                                    <TableCell>{openedCount}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => deleteUrl.mutate(id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
    if (isError) {
        throw new Error("Error");
    } else if (isLoading) {
        return loading;
    }
    return <Suspense fallback={loading}>{body}</Suspense>;
};

export default Dashboard;
