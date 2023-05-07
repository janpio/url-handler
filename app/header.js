"use client";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Header() {
    const LoginHandler = () => {
        if (false) {
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
            <nav className="flex items-center justify-between bg-red-500 bg-opacity-30 backdrop-filter backdrop-blur-lg p-4">
                <Link href="/">Home</Link>
                <LoginHandler />
            </nav>
        </header>
    );
}
