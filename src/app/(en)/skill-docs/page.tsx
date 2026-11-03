import { pageMetadata, skillDocsIndexAlternates } from '@/lib/seo';
import { LanguageRedirect } from '@/UI/LanguageRedirect/LanguageRedirect';

// Kept so existing links still work: sends each visitor to /skill-docs/<lng> in their language
export const metadata = pageMetadata({
    path: '/skill-docs',
    lng: 'en',
    title: 'Skill docs',
    description: 'Tiago\'s articles on front-end development: semantic HTML, ARIA, CSS layouts, animations, SASS, '
        + 'CSS-in-JS, modern and asynchronous JavaScript, Web APIs and React.',
    alternates: skillDocsIndexAlternates(),
});

export default function Page() {
    return <LanguageRedirect path='/skill-docs' />;
}
