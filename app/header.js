import Link from "next/link";
import { getServerSession } from "next-auth";
import ThemeChanger from "./component/themeChange";
import Image from "next/image";

export default async function Header() {
    const session = await getServerSession();

    const LoginHandler = () => {
        if (session?.user?.email) {
            return (
                <Link href="/api/auth/signout">
                    <p>Logout</p>
                </Link>
            );
        } else {
            return (
                <Link href="/api/auth/signin">
                    <p>Login</p>
                </Link>
            );
        }
    };

    return (
        <header className="navbar bg-neutral">
            <div className="navbar-start">
                <Link href="/">Home</Link>
            </div>
            <div className="navbar-center">
                <ThemeChanger />
            </div>
            <div className="navbar-end">
                {session?.user?.email ? (
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} className="btn m-1 btn-circle">
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
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href="/info">Info</Link>
                            </li>
                            <li>
                                <LoginHandler />
                            </li>
                        </ul>
                    </div>
                ) : (
                    <LoginHandler />
                )}
            </div>
        </header>
    );
}
