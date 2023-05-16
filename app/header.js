import Link from "next/link";
import { getServerSession } from "next-auth";
import ThemeChanger from "./component/themeChange";
import Image from "next/image";
import logo from "../public/logo.png";

export default async function Header() {
    const session = await getServerSession();

    const LoginHandler = () => {
        if (session?.user?.email) {
            return (
                <Link href="/api/auth/signout">
                    <Image
                        width={24}
                        height={24}
                        alt="logout"
                        src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/external-logout-screen-from-the-working-portfolio-of-a-user-closeupman-regular-tal-revivo.png"
                    />
                    <p>Logout</p>
                </Link>
            );
        } else {
            return (
                <Link href="/api/auth/signin">
                    <Image
                        width={24}
                        height={24}
                        alt="login"
                        src="https://img.icons8.com/material-outlined/24/user-lock.png"
                    />
                    <p>Login</p>
                </Link>
            );
        }
    };

    return (
        <header className="navbar bg-neutral">
            <div className="navbar-start">
                <Link href="/">
                    <Image src={logo} width={64} height={64} alt="logo"></Image>
                </Link>
            </div>
            <div className="navbar-center">
                <ThemeChanger />
            </div>
            <div className="navbar-end">
                {session?.user?.email ? (
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex={0} className="btn m-1 btn-circle">
                            {session?.user?.image ? (
                                <div className="avatar">
                                    <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <Image
                                            src={session?.user?.image}
                                            width={40}
                                            height={40}
                                            alt="profile picture"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                        <span>
                                            {session?.user?.name
                                                ?.split(" ")
                                                .slice(0, 2)
                                                .map((name) =>
                                                    name.charAt(0).toUpperCase()
                                                )
                                                .join("")}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link href="/info">
                                    <Image
                                        width={24}
                                        height={24}
                                        alt="dashboard"
                                        src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/external-dashboard-user-interface-kmg-design-detailed-outline-kmg-design.png"
                                    />
                                    <p>Dashboard</p>
                                </Link>
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
