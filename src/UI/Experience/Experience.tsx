'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import { Availability, SvgIcon, Tag } from '@/components';
import { useTranslation } from '@/i18n/client';
import {
    education,
    getDuration,
    getYearsOfExperience,
    glanceStats,
    jobs,
    spokenLanguages,
} from '@/lib/experience';
import type { Technology } from '@/lib/technologies';

import styles from './Experience.module.sass';

// Bullets shown before the disclosure. The copy lists them by impact, so the strongest are the visible ones
const VISIBLE_HIGHLIGHTS = 4;

const yearsOfExperience = getYearsOfExperience();

// Rendered at /experience/<lng>, so useTranslation shows it in the path language from the static HTML on
export const Experience = () => {
    const { t, language } = useTranslation();
    const pageRef = useRef<HTMLDivElement>(null);
    // The technology picked in the tags. Jobs that don't use it are dimmed, never hidden
    const [technology, setTechnology] = useState<Technology | null>(null);
    const matchCount = technology ? jobs.filter((job) => job.technologies.includes(technology)).length : 0;
    // UTC on both sides, so the month never shifts with the visitor's time zone and hydration matches
    const monthFormat = new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric', timeZone: 'UTC' });
    const formatMonth = (month: string) => monthFormat.format(new Date(`${month}-01T00:00:00Z`));
    const formatDuration = (range: { start: string; end: string }) => {
        const { years, months } = getDuration(range);
        const yearsText = years ? t('experience.duration_years', { count: years }) : '';
        const monthsText = months ? t('experience.duration_months', { count: months }) : '';

        return yearsText && monthsText
            ? t('experience.duration_join', { years: yearsText, months: monthsText })
            : yearsText || monthsText;
    };

    // A closed disclosure prints as its summary only, so open them all while printing and close them again after
    useEffect(() => {
        // Added to, not replaced: a second beforeprint before afterprint would otherwise forget the first ones
        let opened: HTMLDetailsElement[] = [];
        const openAll = () => {
            const closed = Array.from(
                pageRef.current?.querySelectorAll<HTMLDetailsElement>('details:not([open])') ?? [],
            );

            closed.forEach((details) => details.open = true);
            opened = [...opened, ...closed];
        };
        const restore = () => {
            opened.forEach((details) => details.open = false);
            opened = [];
        };

        window.addEventListener('beforeprint', openAll);
        window.addEventListener('afterprint', restore);

        return () => {
            window.removeEventListener('beforeprint', openAll);
            window.removeEventListener('afterprint', restore);
        };
    }, []);

    // A div, not a section: <main> is already the landmark
    return <div ref={pageRef} className={styles.page}>
        {/* On paper the page is a CV, so it needs the name the navbar and the site's other pages give on screen */}
        <p className={styles['print-name']}>
            {t('experience.person_name')}
        </p>
        <h1 className={styles['page-title']}>
            {t('experience.page_title')}
        </h1>
        {/* Each item reads as one phrase, figure first. The figures come from the highlights below */}
        <ul className={styles.glance} aria-label={t('experience.glance.title')}>
            <li className={styles['glance-card']}>
                <span className={styles['glance-value']}>
                    {t('experience.glance.years.value', { count: yearsOfExperience })}
                </span>
                {' '}
                <span className={styles['glance-label']}>
                    {t('experience.glance.years.label', { count: yearsOfExperience })}
                </span>
            </li>
            {glanceStats.map((id) => <li key={id} className={styles['glance-card']}>
                <span className={styles['glance-value']}>{t(`experience.glance.${id}.value`)}</span>
                {' '}
                <span className={styles['glance-label']}>{t(`experience.glance.${id}.label`)}</span>
            </li>)}
        </ul>
        <section className={styles.subsection} aria-labelledby='work-title'>
            <h2 id='work-title' className={styles['section-title']}>
                {t('experience.work_title')}
            </h2>
            {/* Polite, so the count is read after the pressed state of the tag that changed it */}
            <p className={styles['filter-status']} role='status'>
                {technology
                    ? t('experience.filter.status', { count: matchCount, total: jobs.length, technology })
                    : t('experience.filter.hint')}
            </p>
            {jobs.map(({ id, url, start, end, workMode, technologies }) => {
                const highlights = t(`experience.${id}.highlights`, { returnObjects: true }) as string | string[];
                const count = Array.isArray(highlights) ? highlights.length : 0;
                const hidden = Math.max(count - VISIBLE_HIGHLIGHTS, 0);
                // The strings mark metrics with <b>, rendered as <strong>. Passing t keeps the path language
                const renderHighlight = (index: number) => <li key={index}>
                    <Trans
                        t={t}
                        i18nKey={`experience.${id}.highlights.${index}`}
                        components={{ b: <strong className={styles.metric}/> }}
                    />
                </li>;
                const range = (from: number, to: number) => Array.from({ length: to - from }, (_, i) => from + i);

                const filterClass = technology === null
                    ? ''
                    : styles[technologies.includes(technology) ? 'job-matched' : 'job-dimmed'];

                return <article
                    key={id}
                    className={`${styles.job} ${filterClass}`}
                    aria-labelledby={`${id}-title`}
                >
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
                        {/* Its own paragraph, so the timeline can move it to the date column above phone widths */}
                        <p className={`${styles.meta} ${styles.dates}`}>
                            <span className={styles['date-range']}>
                                <time dateTime={start}>{formatMonth(start)}</time>
                                {' – '}
                                <time dateTime={end}>{formatMonth(end)}</time>
                            </span>
                            {/* The no-break space keeps the dot on the end date's line when a phone wraps the range */}
                            <span className={styles['dates-separator']}>{'\u00a0· '}</span>
                            <span>{formatDuration({ start, end })}</span>
                        </p>
                        <p className={styles.meta}>
                            <span>
                                {t(`experience.${id}.location`)}{' · '}{t(`experience.work_mode.${workMode}`)}
                            </span>
                        </p>
                    </header>
                    {count > 0 && <ul className={styles.highlights}>
                        {range(0, count - hidden).map(renderHighlight)}
                    </ul>}
                    {/* Native disclosure: works by keyboard without JS, and the rest stay in the static HTML */}
                    {hidden > 0 && <details className={styles.more}>
                        <summary className={styles['more-summary']}>
                            {t('experience.show_more', { count: hidden })}
                        </summary>
                        <ul className={styles.highlights}>
                            {range(count - hidden, count).map(renderHighlight)}
                        </ul>
                    </details>}
                    <ul className={styles.technologies} aria-label={t('experience.technologies')}>
                        {technologies.map((tech) => <li key={tech}>
                            <Tag
                                pressed={technology === tech}
                                onClick={() => setTechnology((current) => current === tech ? null : tech)}
                            >
                                {tech}
                            </Tag>
                        </li>)}
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
                    <span>
                        <time dateTime={education.start}>{education.start}</time>
                        {' – '}
                        <time dateTime={education.end}>{formatMonth(education.end)}</time>
                        {' '}{t('experience.education.ifrs.expected')}
                    </span>
                </p>
            </div>
        </section>
        <section className={styles.subsection} aria-labelledby='languages-title'>
            <h2 id='languages-title' className={styles['section-title']}>
                {t('experience.languages.title')}
            </h2>
            <ul className={styles.languages}>
                {spokenLanguages.map((code) => <li key={code}>{t(`experience.languages.${code}`)}</li>)}
            </ul>
        </section>
        {/* The next step for a recruiter who reached the end. Availability's own title stays a p under this h2 */}
        <section className={styles.subsection} aria-labelledby='contact-title'>
            <h2 id='contact-title' className={styles['section-title']}>
                {t('experience.contact_title')}
            </h2>
            <Availability />
        </section>
    </div>;
};
