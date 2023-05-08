"use client";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { getServerSession } from "next-auth";
export default async function Header() {
    const session = await getServerSession();
    const LoginHandler = () => {
        if (session?.user?.email) {
            return (
                <Link href="/api/auth/signout">
                    <LogoutIcon />
                </Link>
            );
        } else {
            return (
                <Link href="/api/auth/signin">
                    <LoginIcon />
                </Link>
            );
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="flex items-center justify-between bg-gradient-to-r from-red-800/70 via-red-400 to-red-800/80 backdrop-filter backdrop-blur-lg p-4">
                <Link className="text-white font-bold" href="/">
                    Home
                </Link>
                <LoginHandler />
            </nav>
        </header>
    );
}
