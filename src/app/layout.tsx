import "./globals.css";
import Header from "../components/header";
import QueryProvider from "../context/queryProvider";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/context/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authProvider";

export const metadata = {
    title: "URL Handler",
    description: "Shorten your URLs with this service",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-background">
                <ThemeProvider>
                    <AuthProvider>
                        <QueryProvider>
                            <Header />
                            {children}
                            <Footer />
                            <Toaster />
                        </QueryProvider>
                    </AuthProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
