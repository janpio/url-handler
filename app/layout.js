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
        <html lang="en" className="h-full">
            <body
                className={`bg-slate-100/10 ${inter.className} pt-16 flex flex-col h-full`}
            >
                <Header />
                <main className="flex-grow">
                    <Provider>{children}</Provider>
                </main>
                <footer className="flex w-full h-12 bg-red-500/30 items-center justify-center">
                    <Link
                        className="hover:text-blue-400"
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
