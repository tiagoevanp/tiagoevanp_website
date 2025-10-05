'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation as useT } from 'react-i18next';

import i18next from './i18next';

export const useTranslation = () => {
    const lng = useParams()?.lng;

    useEffect(() => {
        if (!lng || Array.isArray(lng) || i18next.resolvedLanguage === lng) return;

        i18next.changeLanguage(lng);
    }, [lng]);

    return useT();
};
