'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useSyncExternalStore } from 'react';
import { useTranslation as useT } from 'react-i18next';

import i18next from './i18next';
import { getSkillDocLanguage } from './paths';
import { fallbackLng, storageKey } from './settings';

export { getSkillDocLanguage, getSkillDocPath, getSkillDocSlug } from './paths';

let pathLanguage: string | undefined;
let chosenLanguage: string | undefined;
let detected = false;

i18next.on('languageChanged', (lng) => {
    if (pathLanguage && lng !== pathLanguage) i18next.changeLanguage(pathLanguage);
});

// The language last read in this tab. Each language is a separate page load, so this is how pages that
// only exist in English follow a skill doc opened in another language (see the detection order in i18next.ts)
const rememberReadingLanguage = (lng: string) => {
    try {
        window.sessionStorage.setItem(storageKey, lng);
    } catch {
        // storage unavailable: those pages fall back to the saved or browser language
    }
};

// Until detection runs, <html lang> stays as the static HTML or an inline script set it (see HtmlLang.tsx)
export const hasDetectedLanguage = () => detected;

export const saveLanguage = (lng: string) => {
    chosenLanguage = lng;
    rememberReadingLanguage(lng);

    try {
        window.localStorage.setItem(storageKey, lng);
    } catch {
        // storage unavailable (private mode, disabled cookies): keep the choice in memory only
    }
};

const subscribeToLanguage = (onChange: () => void) => {
    i18next.on('languageChanged', onChange);

    return () => i18next.off('languageChanged', onChange);
};

export const useTranslation = () => {
    const lng = getSkillDocLanguage(usePathname());

    // A skill doc is always shown in its path language, from the first render on, so its static
    // HTML (rendered in that language) and hydration match whatever language the client has saved
    const translation = useT(undefined, { lng });
    // Re-renders on every language change. react-i18next can miss one that happens while Strict Mode
    // re-runs its effects, now that changes are synchronous (the resources are bundled)
    const currentLanguage = useSyncExternalStore(subscribeToLanguage, () => i18next.language, () => fallbackLng);

    useEffect(() => {
        if (!lng) {
            if (!pathLanguage && detected) return;

            detected = true;
            pathLanguage = undefined;

            // Without a chosen language the detector picks the saved or browser one
            i18next.changeLanguage(chosenLanguage);

            return;
        }

        detected = true;
        pathLanguage = lng;
        rememberReadingLanguage(lng);

        if (i18next.resolvedLanguage === lng) return;

        i18next.changeLanguage(lng);
    }, [lng]);

    return { ...translation, language: lng ?? currentLanguage };
};
