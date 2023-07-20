"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notFound, redirect } from "next/navigation";

const FileDownloader = ({ params: { id } }: { params: { id: string } }) => {
    const {
        data: link,
        isLoading,
        isError,
    } = useQuery({
        queryFn: async () => {
            const res = await axios.get(`/api/url/${id}`);
            return res.data;
        },
        queryKey: ["url", id],
        staleTime: Infinity,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        throw new Error("Error");
    }
    if (link) {
        redirect(link);
    } else {
        notFound();
    }
};

export default FileDownloader;
