"use client";
import { useSession } from "next-auth/react";

export default function CSession() {
    const { data } = useSession();

    return <div>Client session:{JSON.stringify(data?.user)}</div>;
}
