import { languages } from './settings';

const normalizePath = (path: string) => path.replace(/\.html$/, '').replace(/\/$/, '');

export const getSkillDocLanguage = (path: string | null) => {
    if (!path?.startsWith('/skill-docs/')) return undefined;

    const lng = normalizePath(path).split('/').pop();

    return lng && languages.includes(lng) ? lng : undefined;
};

// The doc's folder name, e.g. `aria` for /skill-docs/aria/pt-BR
export const getSkillDocSlug = (path: string | null) => {
    if (!getSkillDocLanguage(path)) return undefined;

    const [, , slug] = normalizePath(path ?? '').split('/');

    return slug;
};

export const getSkillDocPath = (path: string, lng: string) => normalizePath(path).replace(/[^/]+$/, lng);
