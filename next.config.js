/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["avatars.githubusercontent.com", "googleusercontent.com"],
    },
};

module.exports = nextConfig;
