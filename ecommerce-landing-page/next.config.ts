import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['i.imgur.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
