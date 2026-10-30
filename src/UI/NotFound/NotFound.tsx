'use client';

import Link from 'next/link';

import { useTranslation } from '@/i18n/client';

import styles from './NotFound.module.sass';

export function NotFound() {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <h1>404</h1>
            <h2>{t('not_found.title')}</h2>
            <p>{t('not_found.description')}</p>
            <Link className={styles['home-link']} href='/'>
                {t('not_found.return_home')}
            </Link>
        </div>
    );
}
