import { pageMetadata } from '@/lib/seo';

// The experience page is a client component, so its metadata lives in this layout
export const metadata = pageMetadata({
    path: '/experience',
    lng: 'en',
    title: 'Experience',
    description: 'Tiago\'s professional experience as a full-stack engineer, with the companies, roles '
        + 'and technologies of each job, plus education and languages.',
});

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
