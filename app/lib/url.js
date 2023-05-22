const baseUrl =
    process.env.NODE_ENV === "production"
        ? "https://url.nexisltd.com"
        : "http://localhost:3000";

export default baseUrl;
