import { pageMetadata, skillDocsIndexAlternates, skillDocsIndexPath } from '@/lib/seo';
import { SkillDocsIndex } from '@/UI/SkillDocsIndex/SkillDocsIndex';

export const metadata = pageMetadata({
    path: skillDocsIndexPath('en'),
    lng: 'en',
    title: 'Skill docs',
    description: 'Tiago\'s articles on front-end development: semantic HTML, ARIA, CSS layouts, animations, SASS, '
        + 'CSS-in-JS, modern and asynchronous JavaScript, Web APIs and React.',
    alternates: skillDocsIndexAlternates(),
});

export default function Page() {
    return <SkillDocsIndex />;
}
