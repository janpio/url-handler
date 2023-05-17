import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function SSession() {
    const { user } = await getServerSession(authOptions);
    return (
        <div>
            <h1>Server session:{JSON.stringify(user)}</h1>
        </div>
    );
}
