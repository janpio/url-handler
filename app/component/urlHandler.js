"use client";
import { useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export default function UrlHandler(props) {
    const fullURLClientSide =
        typeof window !== "undefined" && window.location.href;
    const [link, setLink] = useState("");
    const [genLink, setGenLink] = useState("");
    const copyUrl = (link) => {
        if (typeof window !== "undefined" && window.navigator) {
            window.navigator.clipboard
                .writeText(link)
                .then(() => {
                    setOpenSnackbar(true);
                })
                .catch((error) => {
                    console.error("Failed to copy URL:", error);
                });
        }
    };

    return (
        <div className="flex w-screen h-[85vh] items-center">
            <div className="max-w-[90vw] md:max-w-[50vw] xl:min-w-[22vw] sm:h-[35vh] md:h-[50vh] p-4 md:p-10 rounded-lg shadow-md bg-accent flex flex-col justify-center items-center mx-4 md:mx-12 xl:mx-16">
                <h1 className="text-xl font-bold text-center">
                    Shorten your URL in seconds
                </h1>
                <p className="text-sm text-center mb-6">
                    Makes Downloadable Links Imperceptible, Normal Links Just
                    Shorten
                </p>
                <div className="box w-full">
                    <input
                        type="text"
                        placeholder="Enter your link"
                        className="input input-bordered input-primary w-full max-w-xs"
                        onChange={(value) => setLink(value.target.value)}
                        value={link}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={async () => {
                            const output = await props.fn(link, props.session);
                            const newUrl = `${fullURLClientSide}d/${output}`;
                            copyUrl(newUrl);
                            setGenLink(newUrl);
                            setLink("");
                        }}
                    >
                        Generate Short URL
                    </button>
                </div>
                <div className="justify-between mt-2 h-12 w-full border border-neutral px-4 py-1 rounded-lg flex items-center bg-base-100">
                    <p
                        className="text-sm text-center"
                        placeholder="Generated Link"
                    >
                        {genLink}
                    </p>
                    <button
                        onClick={() => copyUrl(genLink)}
                        className="btn btn-secondary shadow-md h-3/6 "
                    >
                        <FileCopyIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}
