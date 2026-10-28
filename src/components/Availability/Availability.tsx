'use client';

import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';

import { Button } from '../Button/Button';
import styles from './Availability.module.sass';

export const Availability = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.availability} role='group' aria-labelledby='availability-title'>
            <p id='availability-title' className={styles.title}>
                {t('home.availability_title')}
            </p>
            <p className={styles.text}>
                {t('home.availability_text')}
            </p>
            <Button
                className={styles.action}
                href={ExternalLinks.linkedin}
                aria-label={t('home.availability_linkedin_label')}
            >
                {t('home.availability_linkedin')}
            </Button>
        </div>
    );
};
