"use client";
import { usePathname } from "next/navigation";
import UrlDownloader from "./component/url";

export default function FileDownloader() {
    const location = usePathname();
    console.log(location);
    
    } else {
        return <p>No url found</p>;
    }
}
