import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./header";
import Link from "next/link";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "URL Handler",
    description: "Shorten your URLs with this service",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <Header />
                <Provider>
                    <div className="flex mt-24 px-12">{children}</div>
                </Provider>
                <footer className="bg-accent footer footer-center p-4 text-neutral-content fixed bottom-0 ">
                    <Link
                        className="link-primary"
                        href={"https://nexisltd.com"}
                    >
                        Nexis LTD. &copy; {new Date().getFullYear()} | All
                        Rights Reserved.
                    </Link>
                </footer>
            </body>
        </html>
    );
}
