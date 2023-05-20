"use client";
import { getSession } from "next-auth/react";
import { deleteAccount } from "./lib/deleteAccount";
import { redirect } from "next/navigation";

export const revalidate = 60;

const Profile = () => {
    const handleDelete = async () => {
        const session = await getSession();
        if (session) {
            const isDeleted = await deleteAccount(session?.user?.id);
            if (isDeleted) {
                redirect("/");
            }
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <button
                className="btn btn-circle btn-warning"
                onClick={handleDelete}
            >
                Delete Account
            </button>
        </div>
    );
};

export default Profile;
