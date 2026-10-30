import '@/app/globals.sass';

import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';

import { HtmlLang } from '@/i18n/HtmlLang';
import { ogImage, siteName, siteUrl } from '@/lib/seo';
import { ScreenProvider } from '@/providers/ScreenProvider';
import { SidebarProvider } from '@/providers/SidebarProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { PageNavbar } from '@/UI/PageNavbar/PageNavbar';

const notoSans = Noto_Sans({
    variable: '--font-noto-sans',
    subsets: ['latin'],
});

const notoSansMono = Noto_Sans_Mono({
    variable: '--font-noto-sans-mono',
    subsets: ['latin'],
});

const description = 'Personal webpage of Tiago, a full-stack engineer and React & TypeScript expert '
    + 'who also builds with PHP/Laravel and works as an AI engineer.';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteName,
        template: `%s | ${siteName}`,
    },
    description,
    authors: [{ name: 'Tiago the EvanBrother' }],
    icons: {
        icon: { url: '/icons/favicon.ico', sizes: 'any' },
    },
    keywords: [
        'Tiago',
        'full-stack',
        'frontend',
        'frontend developer',
        'backend',
        'backend developer',
        'developer',
        'software developer',
        'react',
        'js',
        'javascript',
        'ts',
        'typescript',
        'node.js',
        'next.js',
        'php',
        'laravel',
        'python',
        'ai engineer',
        'agentic ai',
    ],
    // default values, included to show explicit knowledge of SEO robots
    robots: {
        index: true,
        follow: true,
    },
    other: {
        google: 'notranslate',
    },
    openGraph: {
        type: 'website',
        title: siteName,
        description,
        siteName,
        locale: 'en_US',
        images: [ogImage],
    },
    // tiago.jpg is square, so the large image card would crop it
    twitter: {
        card: 'summary',
    },
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
};

// Each language has its own root layout so the static HTML declares the page language
export function RootLayout({
    lang,
    beforeContent,
    children,
}: Readonly<{
    lang: string;
    // Rendered first in <body>, so an inline script here runs before the page paints
    beforeContent?: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={`${notoSans.variable} ${notoSansMono.variable}`}>
                {beforeContent}
                <HtmlLang />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <ScreenProvider>
                        <SidebarProvider>
                            <PageNavbar>{children}</PageNavbar>
                        </SidebarProvider>
                    </ScreenProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
