import path from 'node:path';

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
    options: {
        // Turbopack needs plugins as paths it can import. An absolute one, since the loader resolves it from each
        // page's folder (see src/lib/headingIds.mjs)
        rehypePlugins: [path.resolve('src/lib/headingIds.mjs')],
    },
});

export default withMDX(nextConfig);
