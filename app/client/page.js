"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Client() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users/")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return <div>{JSON.stringify(data)}</div>;
}
