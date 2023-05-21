"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const revalidate=600;

const TestPage = () => {
    
    const [data,setData]=useState("")
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/test');
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return <div>{JSON.stringify(data)}</div>;
};

export default TestPage;
