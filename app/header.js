import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";
export default async function Header() {
    const session = await getServerSession();
    const LoginHandler = () => {
        if (session?.user?.email) {
            return <Link href="/api/auth/signout">Logout</Link>;
        } else {
            return <Link href="/api/auth/signin">Login</Link>;
        }
    };
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <nav className="flex items-center justify-between bg-gradient-to-r from-red-800/70 via-red-400 to-red-800/80 backdrop-filter backdrop-blur-lg p-4">
                <Link className="text-white font-bold" href="/">
                    Home
                </Link>
                <Link className="text-white font-bold" href="/info">
                    Info
                </Link>
                {session?.user?.email && (
                    <Image
                        src={
                            session?.user?.image ||
                            "https://img.icons8.com/nolan/96/user-default.png"
                        }
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="profile picture"
                    />
                )}
                <LoginHandler />
            </nav>
        </header>
    );
}
