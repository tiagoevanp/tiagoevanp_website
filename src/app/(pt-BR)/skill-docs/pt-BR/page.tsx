import { pageMetadata, skillDocsIndexAlternates, skillDocsIndexPath } from '@/lib/seo';
import { SkillDocsIndex } from '@/UI/SkillDocsIndex/SkillDocsIndex';

export const metadata = pageMetadata({
    path: skillDocsIndexPath('pt-BR'),
    lng: 'pt-BR',
    title: 'Artigos',
    description: 'Artigos de Tiago sobre desenvolvimento front-end: HTML semântico, ARIA, layouts CSS, animações, '
        + 'SASS, CSS-in-JS, JavaScript moderno e assíncrono, Web APIs e React.',
    alternates: skillDocsIndexAlternates(),
});

export default function Page() {
    return <SkillDocsIndex />;
}
