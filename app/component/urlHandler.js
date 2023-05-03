"use client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function UrlHandler(props) {
    const [link, setLink] = useState("");
    return (
        <div className="flex">
            <Box sx={{ border: 2 }}>
                <TextField
                    onChange={(value) => setLink(value.target.value)}
                    value={link}
                />{" "}
                <button onClick={() => props.fn(link, props.session)}>
                    Click me
                </button>
            </Box>
        </div>
    );
}
