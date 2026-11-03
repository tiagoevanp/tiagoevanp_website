'use client';

import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';

import styles from './SiteFooter.module.sass';

// Each language is named in itself, as in the navbar language dropdown
const languageNames: Record<string, string> = {
    'en': 'English',
    'pt-BR': 'Português (Brasil)',
};

// Shown below every page but the skill docs, which end with their own previous/next footer
export const SiteFooter = () => {
    const { t, language } = useTranslation();

    return <footer className={`fade-colors-transition ${styles.footer}`}>
        <div className={styles.container}>
            <nav aria-label={t('site_footer.aria_label')}>
                <ul className={styles.links}>
                    <li><a href={ExternalLinks.linkedin}>{t('site_footer.linkedin')}</a></li>
                    <li><a href={ExternalLinks.github}>{t('site_footer.github')}</a></li>
                    <li><a href={ExternalLinks.email}>{t('site_footer.email')}</a></li>
                </ul>
            </nav>
            <p className={styles.meta}>
                <span>{t('site_footer.copyright', { year: new Date().getFullYear() })}</span>
                <span lang={language}>
                    {t('site_footer.language', { language: languageNames[language] ?? language })}
                </span>
            </p>
        </div>
    </footer>;
};
