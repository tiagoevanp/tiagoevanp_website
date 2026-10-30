'use client';

import Link from 'next/link';

import { SvgIcon, Tag } from '@/components';
import { useTranslation } from '@/i18n/client';
import { jobs } from '@/lib/experience';

import styles from './page.module.sass';

const Experience = () => {
    const { t } = useTranslation();

    return <section className={styles.section}>
        <h1 className={styles['page-title']}>
            {t('experience.page_title')}
        </h1>
        {jobs.map(({ id, url, technologies }) => {
            const highlights = t(`experience.${id}.highlights`, { returnObjects: true }) as string | string[];

            return <article key={id} className={styles.job}>
                <div className={styles.title}>
                    <h2>
                        {t(`experience.${id}.title`)}
                    </h2>
                    {url && <Link
                        href={url}
                        rel='noopener noreferrer'
                        target='_blank'
                        aria-label={t(`experience.${id}.website_link`)}
                    >
                        <SvgIcon name='external-link' variant='large'/>
                    </Link>}
                </div>
                <div className={styles['job-info']}>
                    <div className={styles.technologies}>
                        {technologies.map((tech) => <Tag key={tech}>{tech}</Tag>)}
                    </div>
                    <p>
                        <span>
                            {t(`experience.${id}.occupation`)} - {t(`experience.${id}.full_time`)}
                        </span>
                    </p>
                    <p>
                        <span>
                            {t(`experience.${id}.time`)}
                        </span>
                    </p>
                    <p>
                        <span>
                            {t(`experience.${id}.location`)}
                        </span>
                    </p>
                    {Array.isArray(highlights) && <ul className={styles.highlights}>
                        {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>}
                </div>
            </article>;
        })}
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
