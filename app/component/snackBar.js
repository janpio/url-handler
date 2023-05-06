import React from "react";
import { Button, TextField, Snackbar } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    input: {
        flex: 1,
    },
    copyButton: {
        backgroundColor: "#2979FF",
        color: "#FFF",
        "&:hover": {
            backgroundColor: "#2962FF",
        },
    },
}));

const CopyLinkButton = ({ link }) => {
    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const copyUrl = () => {
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
        <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
                value={link}
                variant="outlined"
                fullWidth
                InputProps={{
                    readOnly: true,
                    style: { paddingRight: "4px" },
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={copyUrl}
                startIcon={<FileCopyIcon />}
                style={{ marginLeft: "8px" }}
            >
                Copy
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message="URL copied to clipboard!"
            />
        </div>
    );
};

export default CopyLinkButton;
