import { notFound } from 'next/navigation';

import { SKILL_DOCS_ENABLED } from '@/lib/features';
import { SkillDocsLayout } from '@/UI/SkillDocsLayout/SkillDocsLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Hidden for now (see src/lib/features.ts): every skill doc renders the 404 page
    if (!SKILL_DOCS_ENABLED) notFound();

    return <SkillDocsLayout>{children}</SkillDocsLayout>;
}
