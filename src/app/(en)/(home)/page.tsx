import { SKILL_DOCS_ENABLED } from '@/lib/features';
import { pageMetadata } from '@/lib/seo';
import { getSkillDocSections } from '@/lib/skillDocSections';
import { Home } from '@/UI/Home/Home';

export const metadata = pageMetadata({
    path: '/',
    lng: 'en',
    title: 'Full-stack & AI Engineer',
    description: 'Tiago is a full-stack engineer and React & TypeScript expert who also builds with PHP/Laravel '
        + 'and works as an AI engineer. '
        + (SKILL_DOCS_ENABLED
            ? 'See his tech stack, experience and skill docs.'
            : 'See his tech stack and experience.'),
});

export default async function Page() {
    return <Home sections={await getSkillDocSections()} />;
}
