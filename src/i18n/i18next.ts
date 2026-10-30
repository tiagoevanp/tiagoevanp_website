import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next/initReactI18next';

import en from './locales/en/translation.json';
import ptBR from './locales/pt-BR/translation.json';
import { defaultNS, fallbackLng, languages } from './settings';

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // Start in the fallback on both sides so the static HTML and hydration match; the client
        // switches to the detected or skill doc language after mounting (see client.ts)
        lng: fallbackLng,
        // Bundled, so a skill doc can render in its own language on the first render (see client.ts)
        resources: {
            en: { [defaultNS]: en },
            'pt-BR': { [defaultNS]: ptBR },
        },
        supportedLngs: languages,
        fallbackLng,
        fallbackNS: defaultNS,
        defaultNS,
        detection: {
            // The language last read in this tab first, then the saved choice (see client.ts)
            order: ['sessionStorage', 'localStorage', 'cookie', 'navigator'],
            caches: [],
        },
    });

export default i18next;
