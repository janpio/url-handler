"use client";
import { Box } from "@mui/material";
import { Prisma, PrismaClient } from "@prisma/client";
import React from "react";

export default function BBox() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Box
                sx={{
                    border: "1px dashed red",
                }}
            >
                <p className="border border-yellow-300 m-10 p-10 bg-cyan-100">
                    dhfdsjhkgjfhgjhfd
                </p>
                <p>jhagdsjhfdgjh</p>
            </Box>
        </div>
    );
}
