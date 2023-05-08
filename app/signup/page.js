"use client";
import { TextField } from "@mui/material";
import { useState } from "react";
import CreateUser from "./lib";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <ToastContainer />
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (password === confirmPassword) {
                        const res = await CreateUser(email, password);
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        if (res?.error) {
                            return toast.error(res?.message);
                        }
                        toast.success(res?.message);
                        router.push("/api/auth/signin");
                    } else {
                        toast.error("Password did not match");
                    }
                }}
                className="bg-white p-8 rounded flex flex-col gap-4 w-1/3"
            >
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    required={true}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    required
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    type="password"
                    label="Confirm Password"
                    required
                    fullWidth
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className="px-6 py-2 rounded-lg bg-cyan-500 w-fit block mx-auto"
                    type="submit"
                >
                    Signup
                </button>
            </form>
        </div>
    );
}
