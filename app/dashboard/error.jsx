"use client"

import { useEffect } from "react";

const Error = ({error,reset}) => {
    useEffect(() => {
        console.error(error);
      }, [error]);
     
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{error}</p>
          <button className="btn btn-accent btn-square"
            onClick={
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      );
    }


export default Error