'use client';

import { useLayoutEffect } from 'react';

import { hasDetectedLanguage, useTranslation } from './client';

export const HtmlLang = () => {
    const { language } = useTranslation();

    useLayoutEffect(() => {
        // Hydration renders in the fallback language, which would undo a lang set before it (see detectLanguage.ts)
        if (language && hasDetectedLanguage()) document.documentElement.lang = language;
    }, [language]);

    return null;
};
