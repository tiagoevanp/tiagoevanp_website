'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getSkillDocSlug, useTranslation } from '@/i18n/client';
import { skillDocPath } from '@/lib/seo';
import GroupsList from '@/providers/lib/GroupsList';

import styles from './Footer.module.sass';

// Pager to the docs before and after the current one, in sidebar order
export const Footer = () => {
    const { t, language } = useTranslation();
    const slug = getSkillDocSlug(usePathname());
    const { previous, next } = slug ? GroupsList.getSiblings(slug) : {};
    // Read as "Previous: <title>", though the title is on its own line. It starts with the visible label
    const name = (direction: 'previous' | 'next', title: string) =>
        `${t(`skill_docs.pager.${direction}`)}: ${t(`sidebar.items.${title}`)}`;

    return <nav className={styles.pager} aria-label={t('skill_docs.pager.label')}>
        {previous && <Link
            className={styles.link}
            href={skillDocPath(previous.href, language)}
            aria-label={name('previous', previous.title)}
        >
            <span className={styles.direction}>
                <span aria-hidden='true'>←</span>
                {t('skill_docs.pager.previous')}
            </span>
            <span className={styles.title}>{t(`sidebar.items.${previous.title}`)}</span>
        </Link>}
        {next && <Link
            className={`${styles.link} ${styles.next}`}
            href={skillDocPath(next.href, language)}
            aria-label={name('next', next.title)}
        >
            <span className={styles.direction}>
                {t('skill_docs.pager.next')}
                <span aria-hidden='true'>→</span>
            </span>
            <span className={styles.title}>{t(`sidebar.items.${next.title}`)}</span>
        </Link>}
    </nav>;
};
