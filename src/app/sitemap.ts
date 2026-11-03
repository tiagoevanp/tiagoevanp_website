import type { MetadataRoute } from 'next';

import { languages } from '@/i18n/settings';
import {
    experienceAlternates,
    experiencePath,
    siteUrl,
    skillDocAlternates,
    skillDocPath,
    skillDocsIndexAlternates,
    skillDocsIndexPath,
} from '@/lib/seo';
import GroupsList from '@/providers/lib/GroupsList';

// Required by output: 'export' to generate sitemap.xml at build time
export const dynamic = 'force-static';

const toUrl = (path: string) => `${siteUrl}${path}`;

// One entry per language version, each listing all of them as hreflang alternates
const languageVersions = (pathFor: (lng: string) => string, alternates: Record<string, string>) => {
    const languageUrls = Object.fromEntries(Object.entries(alternates).map(([lng, path]) => [lng, toUrl(path)]));

    return languages.map((lng) => ({
        url: toUrl(pathFor(lng)),
        alternates: { languages: languageUrls },
    }));
};

export default function sitemap(): MetadataRoute.Sitemap {
    const skillDocs = Object.values(GroupsList.all).flat().flatMap(({ href }) => languageVersions(
        (lng) => skillDocPath(href, lng),
        skillDocAlternates(href),
    ));

    return [
        { url: toUrl('/') },
        ...languageVersions(experiencePath, experienceAlternates()),
        ...languageVersions(skillDocsIndexPath, skillDocsIndexAlternates()),
        ...skillDocs,
    ];
}
