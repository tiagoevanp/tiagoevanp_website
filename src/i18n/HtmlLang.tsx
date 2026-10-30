'use client';

import { useLayoutEffect } from 'react';

import { useTranslation } from './client';

export const HtmlLang = () => {
    const { language } = useTranslation();

    useLayoutEffect(() => {
        if (language) document.documentElement.lang = language;
    }, [language]);

    return null;
};
