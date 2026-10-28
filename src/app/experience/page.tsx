'use client';

import Link from 'next/link';

import { SvgIcon, Tag } from '@/components';
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
            <Link
                href={ExternalLinks.rocketchat}
                rel='noopener noreferrer'
                target='_blank'
                aria-label={t('experience.rocket_chat.website_link')}
            >
                <SvgIcon name='external-link' variant='large'/>
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
            <Link
                href={ExternalLinks.canopus}
                rel='noopener noreferrer'
                target='_blank'
                aria-label={t('experience.canopus.website_link')}
            >
                <SvgIcon name='external-link' variant='large'/>
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
        <section className={styles.subsection} aria-labelledby='education-title'>
            <h2 id='education-title' className={styles['section-title']}>
                {t('experience.education.title')}
            </h2>
            <div className={styles['job-info']}>
                <h3 className={styles['entry-title']}>
                    {t('experience.education.ifrs.institution')}
                </h3>
                <p>
                    {t('experience.education.ifrs.degree')}
                </p>
                <p>
                    <span>
                        {t('experience.education.ifrs.time')}
                    </span>
                </p>
            </div>
        </section>
        <section className={styles.subsection} aria-labelledby='languages-title'>
            <h2 id='languages-title' className={styles['section-title']}>
                {t('experience.languages.title')}
            </h2>
            <ul className={styles.languages}>
                <li>{t('experience.languages.pt')}</li>
                <li>{t('experience.languages.en')}</li>
                <li>{t('experience.languages.es')}</li>
            </ul>
        </section>
    </section>;
};

export default Experience;
