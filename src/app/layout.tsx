import './globals.sass';

import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';

import { HtmlLang } from '@/i18n/HtmlLang';
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
    title: 'Tiago\'s Webpage',
    description,
    authors: [{ name: 'Tiago the EvanBrother' }],
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
        url: 'https://tiagoevanp.github.io/',
        title: 'Tiago\'s Webpage',
        description,
        siteName: 'Tiago\'s Webpage',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://tiagoevanp.github.io/',
        creator: 'Tiago the Evanbrother',
    },
};

export const viewport: Viewport = {
    colorScheme: 'light dark',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/icons/favicon.ico" sizes="any" />
            </head>
            <body className={`${notoSans.variable} ${notoSansMono.variable}`}>
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
