import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

const nextConfig = (phase: string): NextConfig => ({
    // keep dev output apart so `next build` doesn't clobber a running dev server
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
    output: 'export',
    images: { unoptimized: true },
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,
    expireTime: 30,
});

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
});

const config = (phase: string) => withMDX(nextConfig(phase));

export default config;
