'use client';

import { useEffect, useId, useMemo, useState } from 'react';

import { useTranslation } from '@/i18n/client';

import styles from './TableOfContents.module.sass';

type Heading = {
    id: string;
    title: string;
};

type TableOfContentsProps = {
    // The page's sections as JSON, written by the rehype plugin in src/lib/tableOfContents.mjs
    headings: string;
};

// Share of the viewport, from the top, a heading has to scroll into before its section counts as the current one
const currentLine = 0.4;

// The "On this page" list of a skill doc. Rendered twice: a sticky rail beside the article on wide screens and a
// closed disclosure under the intro below that (TableOfContents.module.sass). Only one is displayed at a time, so
// screen readers find a single "On this page" landmark
export const TableOfContents = ({ headings }: TableOfContentsProps) => {
    const { t } = useTranslation();
    const titleId = useId();
    const entries = useMemo<Heading[]>(() => JSON.parse(headings), [headings]);
    const [currentId, setCurrentId] = useState<string>();

    useEffect(() => {
        const targets = entries
            .map(({ id }) => document.getElementById(id))
            .filter((target): target is HTMLElement => target !== null);

        // The current section is the last one whose heading has scrolled above the line; before the first one,
        // in the intro, none is
        const update = () => {
            const line = window.innerHeight * currentLine;

            setCurrentId(targets.findLast((target) => target.getBoundingClientRect().top <= line)?.id);
        };

        // The observed band ends at the line, so the callback runs whenever a heading crosses it, in either
        // direction, and once on start
        const observer = new IntersectionObserver(update, {
            rootMargin: `0px 0px -${(1 - currentLine) * 100}% 0px`,
        });

        targets.forEach((target) => observer.observe(target));

        return () => observer.disconnect();
    }, [entries]);

    const list = (
        <ul className={styles.list}>
            {entries.map(({ id, title }) => (
                <li key={id}>
                    {/* "true", not "page": the link is to a part of this page, not to the page itself */}
                    <a
                        className={styles.link}
                        href={`#${id}`}
                        aria-current={id === currentId ? 'true' : undefined}
                    >
                        {title}
                    </a>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* data-toc places the rail in the article's second column (SkillDocsLayout.module.sass) */}
            <nav className={styles.rail} aria-labelledby={titleId} data-toc>
                {/* A label, not a heading, so the list adds nothing to the article's outline */}
                <p id={titleId} className={styles.title}>{t('skill_docs.toc.title')}</p>
                {list}
            </nav>
            <details className={styles.disclosure}>
                <summary className={styles.summary}>
                    {t('skill_docs.toc.summary', { count: entries.length })}
                </summary>
                <nav aria-label={t('skill_docs.toc.title')}>
                    {list}
                </nav>
            </details>
        </>
    );
};
