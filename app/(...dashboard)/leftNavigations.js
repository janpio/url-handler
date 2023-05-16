"use client";
import { useState } from "react";
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
        { name: "logout", path: "/api/auth/signout" },
    ];

    return (
        <div className="drawer">
            <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                onChange={toggleDrawer}
            />
            <div className="drawer-content">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button"
                >
                    Open drawer
                </label>
            </div>
            {isOpen && (
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {pageRefs.map((pageRef) => (
                            <Link
                                key={pageRef.name}
                                className={
                                    pathName === pageRef.path
                                        ? "bg-secondary"
                                        : ""
                                }
                                onClick={toggleDrawer}
                                href={pageRef.path}
                            >
                                <p>{pageRef.name.toUpperCase()}</p>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
