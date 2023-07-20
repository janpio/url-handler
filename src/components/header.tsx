"use client";
import Link from "next/link";
import Image from "next/image";
import ModeToggle from "@/components/theme-toggle";
import { LayoutDashboardIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { getSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
    const { data: session } = useQuery({
        queryFn: async () => {
            return await getSession();
        },
        queryKey: ["session"],
        staleTime: Infinity,
    });

    const LoginHandler = () => {
        if (session) {
            return (
                <Link href="/api/auth/signout">
                    <LogOutIcon />
                </Link>
            );
        } else {
            return (
                <Link href="/api/auth/signin">
                    <LogInIcon />
                </Link>
            );
        }
    };

    return (
        <div className="flex flex-row justify-between bg-accent fixed top-0 w-full">
            <Link href="/" className="ml-2">
                <Image src={"/logo.png"} width={64} height={64} alt="logo" />
            </Link>
            <div className="flex flex-row justify-evenly gap-2 place-items-center mr-2">
                <ModeToggle />
                {session ? (
                    <DropdownMenu>
                        {session?.user?.image ? (
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <Image
                                        src={session?.user?.image}
                                        width={40}
                                        height={40}
                                        alt="profile picture"
                                    />
                                </Avatar>
                            </DropdownMenuTrigger>
                        ) : (
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <span>
                                        {session?.user?.name
                                            ?.split(" ")
                                            .slice(0, 2)
                                            .map((name) =>
                                                name.charAt(0).toUpperCase()
                                            )
                                            .join("")}
                                    </span>
                                </Avatar>
                            </DropdownMenuTrigger>
                        )}
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link href={"/dashboard"}>
                                    <LayoutDashboardIcon />
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <LoginHandler />
                )}
            </div>
        </div>
    );
};

export default Header;
