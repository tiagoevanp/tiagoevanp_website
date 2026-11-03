import i18next from 'i18next';

import en from '@/i18n/locales/en/translation.json';
import ptBR from '@/i18n/locales/pt-BR/translation.json';
import { defaultNS, fallbackLng } from '@/i18n/settings';

import { education, jobs, spokenLanguages } from './experience';
import { ExternalLinks } from './ExternalLinks';
import { experiencePath, ogImage, siteUrl } from './seo';

// Its own instance, without the browser detection and React bindings of the app's, since this runs at build time.
// Synchronous: the resources are bundled
const i18n = i18next.createInstance();

i18n.init({
    resources: {
        en: { [defaultNS]: en },
        'pt-BR': { [defaultNS]: ptBR },
    },
    fallbackLng,
    defaultNS,
    initAsync: false,
});

// schema.org ProfilePage about a Person, in the language of /experience/<lng>. Past jobs use the Role pattern
// (a worksFor wrapping a worksFor) so each carries its dates and title instead of reading as a current employer
export const experienceJsonLd = (lng: string) => {
    const t = i18n.getFixedT(lng);
    const languageNames = new Intl.DisplayNames([lng], { type: 'language' });
    // Intl gives pt-BR language names in lower case, as written mid-sentence
    const languageName = (code: string) => {
        const name = languageNames.of(code) ?? code;

        return name.charAt(0).toLocaleUpperCase(lng) + name.slice(1);
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: `${siteUrl}${experiencePath(lng)}`,
        inLanguage: lng,
        mainEntity: {
            '@type': 'Person',
            name: t('experience.person_name'),
            url: siteUrl,
            image: `${siteUrl}${ogImage.url}`,
            // The newest job's title
            jobTitle: t(`experience.${jobs[0].id}.occupation`),
            email: ExternalLinks.email.replace('mailto:', ''),
            sameAs: [ExternalLinks.linkedin, ExternalLinks.github],
            worksFor: jobs.map(({ id, url, start, end }) => ({
                '@type': 'EmployeeRole',
                roleName: t(`experience.${id}.occupation`),
                startDate: start,
                endDate: end,
                worksFor: {
                    '@type': 'Organization',
                    name: t(`experience.${id}.title`),
                    url,
                },
            })),
            // Still studying, so no end date
            alumniOf: {
                '@type': 'OrganizationRole',
                startDate: education.start,
                alumniOf: {
                    '@type': 'CollegeOrUniversity',
                    name: t('experience.education.ifrs.institution'),
                },
            },
            knowsLanguage: spokenLanguages.map((code) => ({
                '@type': 'Language',
                name: languageName(code),
                alternateName: code,
            })),
            knowsAbout: Array.from(new Set(jobs.flatMap(({ technologies }) => technologies))),
        },
    };
};
