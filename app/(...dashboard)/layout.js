import LeftNavigations from "./leftNavigations";

export const metadata = {
    title: "URL Handler",
    description: "Shorten your URLs with this service",
};

export default function RootLayout({ children }) {
    return (
        <>
            <LeftNavigations />
            <div className="px-32">{children}</div>
        </>
    );
}
