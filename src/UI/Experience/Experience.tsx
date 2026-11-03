'use client';

import Link from 'next/link';

import { SvgIcon, Tag } from '@/components';
import { useTranslation } from '@/i18n/client';
import { jobs } from '@/lib/experience';

import styles from './Experience.module.sass';

// Rendered at /experience/<lng>, so useTranslation shows it in the path language from the static HTML on
export const Experience = () => {
    const { t } = useTranslation();

    // A div, not a section: <main> is already the landmark
    return <div className={styles.page}>
        <h1 className={styles['page-title']}>
            {t('experience.page_title')}
        </h1>
        <section className={styles.subsection} aria-labelledby='work-title'>
            <h2 id='work-title' className={styles['section-title']}>
                {t('experience.work_title')}
            </h2>
            {jobs.map(({ id, url, technologies }) => {
                const highlights = t(`experience.${id}.highlights`, { returnObjects: true }) as string | string[];

                return <article key={id} className={styles.job} aria-labelledby={`${id}-title`}>
                    {/* Who, where and when first, so they are the fastest scan */}
                    <header className={styles.header}>
                        <h3 id={`${id}-title`} className={styles.role}>
                            {t(`experience.${id}.occupation`)}
                        </h3>
                        {/* A div, not a p: SvgIcon renders a div. The company name itself is the link */}
                        <div className={styles.company}>
                            {url ? <Link
                                className={styles['company-link']}
                                href={url}
                                rel='noopener noreferrer'
                                target='_blank'
                                aria-label={t(`experience.${id}.website_link`)}
                            >
                                {t(`experience.${id}.title`)}
                                <SvgIcon className={styles['company-icon']} name='external-link' variant='small'/>
                            </Link> : <span>{t(`experience.${id}.title`)}</span>}
                        </div>
                        <p className={styles.meta}>
                            <span>{t(`experience.${id}.time`)}</span>
                            <span>{t(`experience.${id}.location`)}</span>
                        </p>
                    </header>
                    {Array.isArray(highlights) && <ul className={styles.highlights}>
                        {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>}
                    <ul className={styles.technologies} aria-label={t('experience.technologies')}>
                        {technologies.map((tech) => <li key={tech}><Tag>{tech}</Tag></li>)}
                    </ul>
                </article>;
            })}
        </section>
        <section className={styles.subsection} aria-labelledby='education-title'>
            <h2 id='education-title' className={styles['section-title']}>
                {t('experience.education.title')}
            </h2>
            <div className={styles.header}>
                <h3 className={styles.role}>
                    {t('experience.education.ifrs.institution')}
                </h3>
                <p className={styles.company}>
                    {t('experience.education.ifrs.degree')}
                </p>
                <p className={styles.meta}>
                    <span>{t('experience.education.ifrs.time')}</span>
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
    </div>;
};
