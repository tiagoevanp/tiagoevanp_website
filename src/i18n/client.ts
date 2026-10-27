'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation as useT } from 'react-i18next';

import i18next from './i18next';
import { getSkillDocLanguage } from './paths';

export { getSkillDocLanguage, getSkillDocPath } from './paths';

const storageKey = 'i18nextLng';
let pathLanguage: string | undefined;
let chosenLanguage: string | undefined;

i18next.on('languageChanged', (lng) => {
    if (pathLanguage && lng !== pathLanguage) i18next.changeLanguage(pathLanguage);
});

export const saveLanguage = (lng: string) => {
    chosenLanguage = lng;

    try {
        window.localStorage.setItem(storageKey, lng);
    } catch {
        // storage unavailable (private mode, disabled cookies): keep the choice in memory only
    }
};

export const changeSkillDocLanguage = (lng: string) => {
    pathLanguage = lng;

    return i18next.changeLanguage(lng);
};

export const useTranslation = () => {
    const lng = getSkillDocLanguage(usePathname());

    useEffect(() => {
        if (!lng) {
            if (!pathLanguage) return;

            pathLanguage = undefined;

            i18next.changeLanguage(chosenLanguage);

            return;
        }

        pathLanguage = lng;

        if (i18next.resolvedLanguage === lng) return;

        i18next.changeLanguage(lng);
    }, [lng]);

    return useT();
};
