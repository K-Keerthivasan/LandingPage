// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'imgur.com' },
            { protocol: 'https', hostname: 'i.imgur.com' },
        ],
        // optional, but nice
        formats: ['image/avif', 'image/webp'],
    },

    // 308 redirects: /our_works → /our-works (preserves SEO)
    async redirects() {
        return [
            {
                source: '/our_works',
                destination: '/our-works',
                permanent: true,
            },
            {
                source: '/our_works/:slug*',
                destination: '/our-works/:slug*',
                permanent: true,
            },
        ];
    },

    // keep your TS section as-is
    typescript: {
        /*
        ignoreBuildErrors: true,
        */
    },
    // optional, but recommended
    reactStrictMode: true,
};

export default nextConfig;
