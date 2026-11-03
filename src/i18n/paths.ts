import { languages } from './settings';

// Pages with one URL per language, which end in it: /skill-docs/<lng>, /skill-docs/<slug>/<lng> and /experience/<lng>
const localizedSections = ['/skill-docs/', '/experience/'];

const normalizePath = (path: string) => path.replace(/\.html$/, '').replace(/\/$/, '');

export const getPathLanguage = (path: string | null) => {
    if (!localizedSections.some((section) => path?.startsWith(section))) return undefined;

    const lng = normalizePath(path ?? '').split('/').pop();

    return lng && languages.includes(lng) ? lng : undefined;
};

// The doc's folder name, e.g. `aria` for /skill-docs/aria/pt-BR. Undefined on the index, /skill-docs/<lng>
export const getSkillDocSlug = (path: string | null) => {
    if (!path?.startsWith('/skill-docs/') || !getPathLanguage(path)) return undefined;

    const [, , slug, lng] = normalizePath(path).split('/');

    return lng ? slug : undefined;
};

// The same page in another language, e.g. /experience/en for /experience/pt-BR
export const getLanguagePath = (path: string, lng: string) => normalizePath(path).replace(/[^/]+$/, lng);
