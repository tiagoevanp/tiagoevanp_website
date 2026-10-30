import { RootLayout } from '@/UI/RootLayout/RootLayout';

export { metadata, viewport } from '@/UI/RootLayout/RootLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <RootLayout lang='pt-BR'>{children}</RootLayout>;
}
