import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { getSkillDocLanguage } from './paths';
import { defaultNS, fallbackLng, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: runsOnServerSide ? undefined : getSkillDocLanguage(window.location.pathname),
        supportedLngs: languages,
        fallbackLng,
        fallbackNS: defaultNS,
        defaultNS,
        detection: {
            order: ['localStorage', 'cookie', 'navigator'],
            caches: [],
        },
        preload: runsOnServerSide ? languages : [],
    });

export default i18next;
