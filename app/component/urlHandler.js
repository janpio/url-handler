"use client";
import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { styled } from "@mui/material/styles";
import { useParams, usePathname, useRouter } from "next/navigation";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
});

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
        <div className="flex w-screen h-[85vh] items-center text-white">
            <div className="max-w-[90vw] md:max-w-[50vw] xl:min-w-[22vw] sm:h-[35vh] md:h-[50vh] p-4 md:p-10 bg-gradient-to-br from-red-800 via-red-300 to-red-300 rounded-lg shadow-md shadow-slate-800 flex flex-col justify-center items-center mx-4 md:mx-12 xl:mx-16">
                <h1 className="text-xl font-bold text-center">
                    Shorten your URL in seconds
                </h1>
                <p className="text-sm text-center mb-6">
                    google drive links are untraceable
                </p>
                <Box sx={{ width: "100%" }}>
                    <CssTextField
                        sx={{ color: "white", width: "100%" }}
                        fullWidth
                        label="Enter your link"
                        onChange={(value) => setLink(value.target.value)}
                        value={link}
                    />
                    <button
                        className="block mx-auto px-6 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-300 ease-in mt-3 shadow-md shadow-slate-600"
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
                </Box>
                <div style={{ display: "flex", alignItems: "center" }} className="justify-between mt-2 h-12 w-full border border-cyan-500 px-4 py-1 rounded-lg">
                    <p className="text-sm text-center">{genLink}</p>
                <button
                    onClick={() => copyUrl(genLink)}
                    className="px-6 bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-300 ease-in shadow-md h-full shadow-slate-600"
                >
                   <FileCopyIcon  />
                </button>
            </div>
            </div>
            
        </div>
    );
}
