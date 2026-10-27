import { languages } from './settings';

const normalizePath = (path: string) => path.replace(/\.html$/, '').replace(/\/$/, '');

export const getSkillDocLanguage = (path: string | null) => {
    if (!path?.startsWith('/skill-docs/')) return undefined;

    const lng = normalizePath(path).split('/').pop();

    return lng && languages.includes(lng) ? lng : undefined;
};

export const getSkillDocPath = (path: string, lng: string) => normalizePath(path).replace(/[^/]+$/, lng);
