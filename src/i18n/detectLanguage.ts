import { cookieName, fallbackLng, languages, storageKey } from './settings';

// Runs inline before the page paints, so it mirrors the detection order in i18next.ts without the library
const detect = (supported: string[], fallback: string, key: string, cookie: string) => {
    const read = (get: () => string | null | undefined) => {
        try {
            return get();
        } catch {
            return undefined;
        }
    };

    const codes = [
        read(() => window.sessionStorage.getItem(key)),
        read(() => window.localStorage.getItem(key)),
        read(() => document.cookie.match(new RegExp(`(?:^|; )${cookie}=([^;]*)`))?.[1]),
        ...(navigator.languages ?? [navigator.language]),
    ];

    // Like i18next, a code matches a supported language exactly or by its base language (pt-PT → pt-BR)
    const base = (code: string) => code.split('-')[0].toLowerCase();
    const match = (code: string) => supported.find((lng) => lng === code)
        ?? supported.find((lng) => base(lng) === base(code));

    for (const code of codes) {
        const lng = code && match(code);

        if (lng) return lng;
    }

    return fallback;
};

export const detectLanguage = () => detect(languages, fallbackLng, storageKey, cookieName);

const args = [languages, fallbackLng, storageKey, cookieName].map((arg) => JSON.stringify(arg)).join(',');
const detectedLanguage = `(${detect.toString()})(${args})`;

// For pages served in whatever language the visitor reads, like the single 404.html of the static export
export const detectLanguageScript = `document.documentElement.lang = ${detectedLanguage}`;

// For a path that only sends the visitor on to their language's version of it, e.g. /experience to /experience/pt-BR
export const redirectToLanguageScript = (path: string) => `location.replace(${JSON.stringify(`${path}/`)} + `
    + `${detectedLanguage} + location.search + location.hash)`;
