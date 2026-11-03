import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { compile } from '@mdx-js/mdx';

import GroupsList from '@/providers/lib/GroupsList';

import { countSections } from './headingIds.mjs';

// Number of sections of each skill doc, by href. Server only: read from the `en` MDX at build time and passed down
// to the cards, so the counts follow the articles. The MDX is compiled as the build does, so setext headings count
// and `##` lines inside code blocks don't
export type SkillDocSections = Record<string, number>;

const countFile = async (href: string) => {
    const source = await readFile(path.resolve('src/app/(en)/skill-docs', href, 'en/page.mdx'), 'utf8');
    let count = 0;

    await compile(source, { rehypePlugins: [() => (tree) => {
        count = countSections(tree);
    }] });

    return count;
};

export const getSkillDocSections = async (): Promise<SkillDocSections> => {
    const items = Object.values(GroupsList.all).flat();

    return Object.fromEntries(await Promise.all(items.map(async ({ href }) => [href, await countFile(href)])));
};
