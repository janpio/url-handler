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
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Header = () => {
    const { data: session, isLoading } = useQuery({
        queryFn: async () => {
            return await getSession();
        },
        queryKey: ["session"],
        staleTime: Infinity,
    });

    const LoginHandler = () => {
        if (session) {
            return (
                <Link
                    href="/api/auth/signout"
                    className="flex flex-row justify-around"
                >
                    <LogOutIcon />
                    <span>Logout</span>
                </Link>
            );
        } else {
            return (
                <Link
                    href="/api/auth/signin"
                    className="flex flex-row justify-around"
                >
                    <LogInIcon />
                    <span>Login</span>
                </Link>
            );
        }
    };

    return (
        <div className="flex flex-row justify-between bg-accent fixed top-0 w-full">
            <Link href="/" className="ml-2">
                <Image src={"/logo.png"} width={64} height={64} alt="logo" />
            </Link>
            <div className="flex gap-2 place-items-center mr-2">
                {isLoading ? (
                    <Skeleton className="w-[40px] h-[40px]" />
                ) : session ? (
                    <DropdownMenu>
                        {session?.user?.image ? (
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <Avatar>
                                        <Image
                                            src={session?.user?.image}
                                            width={40}
                                            height={40}
                                            alt="profile picture"
                                        />
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                        ) : (
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
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
                                </Button>
                            </DropdownMenuTrigger>
                        )}
                        <DropdownMenuContent align="end" className="gap-2">
                            <DropdownMenuItem>
                                <Link
                                    href={"/dashboard"}
                                    className="flex flex-row gap-2 place-items-center"
                                >
                                    <LayoutDashboardIcon />
                                    <span>Dashboard</span>
                                </Link>
                                <hr />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center place-items-center">
                                <ModeToggle />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex flex-row gap-2 place-items-center">
                        <ModeToggle />
                        <LoginHandler />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
