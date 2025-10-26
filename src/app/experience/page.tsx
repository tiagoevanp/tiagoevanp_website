'use client';

import { Tag } from '@/components/Tag/Tag';
import { useTranslation } from '@/i18n/client';

import styles from './page.module.sass';

const Experience = () => {
    const { t } = useTranslation();

    return <section className={styles.container}>
        <h1>
            {t('experience.rocket_chat.title')}
        </h1>
        <div className={styles.jobInfo}>
            <p>
                {t('experience.rocket_chat.company')}
                {t('experience.rocket_chat.full_time')}
            </p>
            <p>
                {t('experience.rocket_chat.time')}
            </p>
            <p>
                {t('experience.rocket_chat.location')}
            </p>
            <p>
                {t('experience.rocket_chat.description')}
            </p>
            <div className={styles.technologies}>
                <Tag>{t('javascript')}</Tag>
                <Tag>{t('typescript')}</Tag>
                <Tag>{t('react')}</Tag>
                <Tag>{t('meteor')}</Tag>
                <Tag>{t('node')}</Tag>
                <Tag>{t('mongodb')}</Tag>
                <Tag>{t('jest')}</Tag>
                <Tag>{t('react_testing_library')}</Tag>
                <Tag>{t('playwright')}</Tag>
                <Tag>{t('git')}</Tag>
            </div>
        </div>
    </section>;
};

export default Experience;
