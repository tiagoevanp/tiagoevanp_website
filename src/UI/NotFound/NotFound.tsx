'use client';

import Link from 'next/link';

import i18next from '@/i18n/i18next';
import { languages } from '@/i18n/settings';

import styles from './NotFound.module.sass';

// Every language is in the static HTML and CSS shows the one matching <html lang>, so the copy is right
// from the first paint (see global-not-found.tsx) and follows a language picked in the navbar
export function NotFound() {
    return (
        <div className={styles.page}>
            <h1>404</h1>
            {languages.map((lng) => {
                const t = i18next.getFixedT(lng);

                return (
                    <div key={lng} className={styles.copy} lang={lng}>
                        <h2>{t('not_found.title')}</h2>
                        <p>{t('not_found.description')}</p>
                        <Link className={styles['home-link']} href='/'>
                            {t('not_found.return_home')}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
