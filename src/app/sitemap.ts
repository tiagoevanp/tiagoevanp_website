import type { MetadataRoute } from 'next';

import { languages } from '@/i18n/settings';
import { siteUrl, skillDocAlternates, skillDocPath } from '@/lib/seo';
import GroupsList from '@/providers/lib/GroupsList';

// Required by output: 'export' to generate sitemap.xml at build time
export const dynamic = 'force-static';

const toUrl = (path: string) => `${siteUrl}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
    const skillDocs = Object.values(GroupsList.all).flat().flatMap(({ href }) => {
        const alternates = Object.fromEntries(
            Object.entries(skillDocAlternates(href)).map(([lng, path]) => [lng, toUrl(path)]),
        );

        return languages.map((lng) => ({
            url: toUrl(skillDocPath(href, lng)),
            alternates: { languages: alternates },
        }));
    });

    return [
        { url: toUrl('/') },
        { url: toUrl('/experience') },
        ...skillDocs,
    ];
}
