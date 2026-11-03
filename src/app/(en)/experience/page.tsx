import { experienceAlternates, pageMetadata } from '@/lib/seo';
import { LanguageRedirect } from '@/UI/LanguageRedirect/LanguageRedirect';

// Kept so existing links still work: sends each visitor to /experience/<lng> in their language
export const metadata = pageMetadata({
    path: '/experience',
    lng: 'en',
    title: 'Experience',
    description: 'Tiago\'s professional experience as a full-stack engineer, with the companies, roles '
        + 'and technologies of each job, plus education and languages.',
    alternates: experienceAlternates(),
});

export default function Page() {
    return <LanguageRedirect path='/experience' />;
}
