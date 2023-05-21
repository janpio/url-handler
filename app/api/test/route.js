import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const token = await getToken({ req });
    if (token) {
        return NextResponse.json(JSON.stringify(token));
    } else {
        return NextResponse.json({ error: "Unauth" });
    }
};
