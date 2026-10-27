'use client';

import { useLayoutEffect } from 'react';

import { useTranslation } from './client';

export const HtmlLang = () => {
    const { i18n: { language } } = useTranslation();

    useLayoutEffect(() => {
        if (language) document.documentElement.lang = language;
    }, [language]);

    return null;
};
