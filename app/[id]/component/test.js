"use server";

export default async function Test({ pathName }) {
    
    if (url) {
        return (
            <p
                key={url}
                className="text-white hover:text-yellow-500"
                onClick={() => console.log(url)}
            >
                {url}
            </p>
        );
    }
}
