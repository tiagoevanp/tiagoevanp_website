'use client';

import { useTranslation } from '@/i18n/client';

import styles from './not-found.module.sass';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <h1>404</h1>
            <h2>{t('not_found.title')}</h2>
            <p>{t('not_found.description')}</p>
        </div>
    );
}
