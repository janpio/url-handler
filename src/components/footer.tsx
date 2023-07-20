import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-accent p-4 text-neutral-content fixed bottom-0 w-full flex justify-center">
            <Link className="link-primary" href={"https://nexisltd.com"}>
                Nexis LTD. &copy; {new Date().getFullYear()} | All Rights
                Reserved.
            </Link>
        </footer>
    );
};
export default Footer;
