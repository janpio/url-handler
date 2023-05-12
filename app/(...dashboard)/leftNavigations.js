"use client";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LeftNavigations() {
    const conditionDrawer = sessionStorage.getItem("drawer");
    const [isOpen, setIsOpen] = useState(!!(conditionDrawer === "true"));

    const toggleDrawer = () => {
        setIsOpen((prevIsOpen) => {
            const newIsOpen = !prevIsOpen;
            sessionStorage.setItem("drawer", newIsOpen.toString());
            return newIsOpen;
        });
    };

    const pathName = usePathname();
    const pageRefs = [
        { name: "info", path: "/info" },
        { name: "setting", path: "/settings" },
        { name: "logout", path: "/api/" },
    ];

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
            >
                <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={toggleDrawer}>
                <List>
                    {pageRefs.map((pageRef) => (
                        <ListItem key={pageRef.name}>
                            <Link
                                className={
                                    pathName === pageRef.path
                                        ? "bg-blue-500"
                                        : ""
                                }
                                onClick={toggleDrawer}
                                href={pageRef.path}
                            >
                                {pageRef.name.toUpperCase()}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}
