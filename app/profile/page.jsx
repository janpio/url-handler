"use client";

import { getSession } from "next-auth/react";
import { deleteAccount } from "./lib/deleteAccount";
import nookies,{ destroyCookie } from "nookies";

const Profile = () => {
    const handleDelete = async () => {
        const session = await getSession();
        
        if (session) {
            destroyCookie("next-auth.session-token"),
            await deleteAccount(session?.user?.id);
            window.location.href = "/";
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <button
                className="btn btn-circle btn-warning btn-lg btn-xl"
                onClick={handleDelete}
            >
                Delete Account
            </button>
        </div>
    );
};

export default Profile;
