import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['imgur.com', 'i.imgur.com'],
    },
    typescript: {
/*
        ignoreBuildErrors: true,
*/
    },
};

export default nextConfig;
