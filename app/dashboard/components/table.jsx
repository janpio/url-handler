"use client";

import myAxios from "@/app/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const DashboardTable = ({ baseUrl }) => {
    const queryClient = useQueryClient()
    const {data,isLoading,isError}=useQuery({queryFn:async()=>{
        const res= await myAxios.get("url")
        return res.data
    },queryKey:["urls"]})

    const deleteUrl = useMutation({mutationFn:async(id)=>{
        const res = await myAxios.delete(`url/${id}`)
        return res.data
    },onSuccess: () => {
        queryClient.invalidateQueries(["urls"]);
    },})
    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error occurred while fetching data</div>;
      }
    return (
        <>
        <p>You have  {data.count}  urls</p> 
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
                    {data?.allUrls?.map((url, index) => (
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
                                    onClick={()=>deleteUrl.mutate(url.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default DashboardTable;
