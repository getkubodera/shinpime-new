import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "m.media-amazon.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "blog.shinpi.me",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
