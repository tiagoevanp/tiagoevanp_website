import { pageMetadata } from '@/lib/seo';
import { SkillDocsIndex } from '@/UI/SkillDocsIndex/SkillDocsIndex';

// Only exists under the en root layout, like /experience; the client switches to the visitor's language
export const metadata = pageMetadata({
    path: '/skill-docs',
    lng: 'en',
    title: 'Skill docs',
    description: 'Tiago\'s articles on front-end development: semantic HTML, ARIA, CSS layouts, animations, SASS, '
        + 'CSS-in-JS, modern and asynchronous JavaScript, Web APIs and React.',
});

export default function Page() {
    return <SkillDocsIndex />;
}
