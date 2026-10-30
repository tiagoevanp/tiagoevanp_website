'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getSkillDocSlug, useTranslation } from '@/i18n/client';
import { skillDocPath } from '@/lib/seo';
import GroupsList from '@/providers/lib/GroupsList';

import styles from './Footer.module.sass';

// Links to the docs before and after the current one, in sidebar order
export const Footer = () => {
    const { t, language } = useTranslation();
    const slug = getSkillDocSlug(usePathname());
    const { previous, next } = slug ? GroupsList.getSiblings(slug) : {};

    return <footer className={styles.footer}>
        {/* The empty span keeps "next" on the right on the first doc */}
        {previous
            ? <Link className={`${styles.link} ${styles.previous}`} href={skillDocPath(previous.href, language)}>
                {t(`sidebar.items.${previous.title}`)}
            </Link>
            : <span />}
        {next && <Link className={`${styles.link} ${styles.next}`} href={skillDocPath(next.href, language)}>
            {t(`sidebar.items.${next.title}`)}
        </Link>}
    </footer>;
};
