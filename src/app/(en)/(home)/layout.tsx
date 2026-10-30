import { pageMetadata } from '@/lib/seo';

// The home page is a client component, so its metadata lives in this layout
export const metadata = pageMetadata({
    path: '/',
    lng: 'en',
    title: 'Full-stack & AI Engineer',
    description: 'Tiago is a full-stack engineer and React & TypeScript expert who also builds with PHP/Laravel '
        + 'and works as an AI engineer. See his tech stack, experience and skill docs.',
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
