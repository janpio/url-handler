"use client";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import CopyLinkButton from "./snackBar";

export default function UrlHandler(props) {
    const [link, setLink] = useState("");
    const [genLink, setGenLink] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
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
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="flex">
            <Box sx={{ border: 2 }}>
                <TextField
                    onChange={(value) => setLink(value.target.value)}
                    value={link}
                />{" "}
                <button
                    onClick={async () => {
                        const output = await props.fn(link, props.session);
                        const newUrl = `http://localhost:3000/d/${output}`;
                        copyUrl(newUrl);
                        setGenLink(newUrl);
                        setLink("");
                    }}
                >
                    Click me
                </button>
            </Box>
            <CopyLinkButton link={genLink} />
        </div>
    );
}
