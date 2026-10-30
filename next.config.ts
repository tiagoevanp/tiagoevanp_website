import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: { unoptimized: true },
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,
    expireTime: 30,
    experimental: {
        // Needed for the 404 page, since each language has its own root layout
        globalNotFound: true,
    },
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
