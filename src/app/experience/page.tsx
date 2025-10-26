'use client';

import Link from 'next/link';

import { SvgIcon } from '@/components';
import { Tag } from '@/components/Tag/Tag';
import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';

import styles from './page.module.sass';

const Experience = () => {
    const { t } = useTranslation();

    return <section className={styles.section}>
        <div className={styles.title}>
            <h1>
                {t('experience.rocket_chat.title')}
            </h1>
            <Link href={ExternalLinks.rocketchat} rel='noopener noreferrer' target='_blank'>
                <SvgIcon name='externalLink' variant='large'/>
            </Link>
        </div>
        <div className={styles['job-info']}>
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
            <p>
                <span>
                    {t('experience.rocket_chat.occupation')} - {t('experience.rocket_chat.full_time')}
                </span>
            </p>
            <p>
                <span>
                    {t('experience.rocket_chat.time')}
                </span>
            </p>
            <p>
                <span>
                    {t('experience.rocket_chat.location')}
                </span>
            </p>
            <p>
                {t('experience.rocket_chat.description')}
            </p>
        </div>
        <div className={styles.title}>
            <h1>
                {t('experience.canopus.title')}
            </h1>
            <Link href={ExternalLinks.canopus} rel='noopener noreferrer' target='_blank'>
                <SvgIcon name='externalLink' variant='large'/>
            </Link>
        </div>
        <div className={styles['job-info']}>
            <div className={styles.technologies}>
                <Tag>{t('javascript')}</Tag>
                <Tag>{t('php')}</Tag>
                <Tag>{t('python')}</Tag>
                <Tag>{t('dotnet')}</Tag>
                <Tag>{t('postgresql')}</Tag>
                <Tag>{t('mysql')}</Tag>
                <Tag>{t('oracledb')}</Tag>
                <Tag>{t('fullstack')}</Tag>
                <Tag>{t('git')}</Tag>
            </div>
            <p>
                <span>
                    {t('experience.canopus.occupation')} - {t('experience.canopus.full_time')}
                </span>
            </p>
            <p>
                <span>
                    {t('experience.canopus.time')}
                </span>
            </p>
            <p>
                <span>
                    {t('experience.canopus.location')}
                </span>
            </p>
            <p>
                {t('experience.canopus.description')}
            </p>
        </div>
    </section>;
};

export default Experience;
