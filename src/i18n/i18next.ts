import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultNS, fallbackLng, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

i18next
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // Start in the fallback on both sides so the static HTML and hydration match; the client
        // switches to the detected or skill doc language after mounting (see client.ts)
        lng: fallbackLng,
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
