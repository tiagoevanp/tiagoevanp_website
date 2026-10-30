import type { Metadata } from 'next';

import { fallbackLng, languages } from '@/i18n/settings';

export const siteUrl = 'https://tiagoevanp.com.br';
export const siteName = 'Tiago\'s Webpage';

export const ogImage = {
    url: '/tiago.jpg',
    width: 512,
    height: 512,
    alt: 'Portrait of Tiago',
};

const ogLocales: Record<string, string> = {
    'en': 'en_US',
    'pt-BR': 'pt_BR',
};

export const skillDocPath = (slug: string, lng: string) => `/skill-docs/${slug}/${lng}`;

// hreflang links between the language versions of a doc, plus x-default for any other language
export const skillDocAlternates = (slug: string) => ({
    ...Object.fromEntries(languages.map((lng) => [lng, skillDocPath(slug, lng)])),
    'x-default': skillDocPath(slug, fallbackLng),
});

type PageMetadata = {
    path: string;
    lng: string;
    title: string;
    description: string;
    alternates?: Record<string, string>;
};

// Child metadata replaces the parent's openGraph object as a whole, so every page sets all of it
export const pageMetadata = ({ path, lng, title, description, alternates }: PageMetadata): Metadata => ({
    title,
    description,
    alternates: {
        canonical: path,
        languages: alternates,
    },
    openGraph: {
        type: 'website',
        url: path,
        title: `${title} | ${siteName}`,
        description,
        siteName,
        locale: ogLocales[lng],
        alternateLocale: alternates
            ? languages.filter((other) => other !== lng).map((other) => ogLocales[other])
            : undefined,
        images: [ogImage],
    },
});

export const skillDocMetadata = (slug: string, lng: string, title: string, description: string) => pageMetadata({
    path: skillDocPath(slug, lng),
    lng,
    title,
    description,
    alternates: skillDocAlternates(slug),
});
