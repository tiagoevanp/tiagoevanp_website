import './globals.sass';

import type { Metadata, Viewport } from 'next';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';

import i18next from '@/i18n/i18next';
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

export const metadata: Metadata = {
    title: 'Tiago Webpage',
    description: 'Site pessoal de Tiago',
    authors: [{ name: 'Tiago the EvanBrother' }],
    keywords: [
        'Tiago',
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
        title: 'Tiago Webpage',
        description: 'Personal webpage from Tiago the EvanBrother',
        siteName: 'Tiago Webpage',
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
        <html suppressHydrationWarning lang={i18next.language}>
            <body className={`${notoSans.variable} ${notoSansMono.variable}`}>
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
