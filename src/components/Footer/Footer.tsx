'use client';

import Link from 'next/link';

import { useTranslation } from '@/i18n/client';

import styles from './Footer.module.sass';

type LinkProps = {
    title: string
    href: string
};

type FooterProps = {
    previous?: LinkProps
    next?: LinkProps
};

export const Footer = ({ previous, next }: FooterProps) => {
    const { t, i18n } = useTranslation();

    return <footer className={styles.footer}>
        <Link
            className={`${styles.link} ${styles.previous}`}
            href={`/skill-docs/${previous?.href}/${i18n.language}`}
            aria-hidden={!previous}
            style={{ visibility: previous ? 'visible' : 'hidden' }}
        >
            {t(previous?.title ?? '')}
        </Link>
        <Link
            className={`${styles.link} ${styles.next}`}
            href={`/skill-docs/${next?.href}/${i18n.language}`}
            aria-hidden={!next}
            style={{ visibility: next ? 'visible' : 'hidden' }}
        >
            {t(next?.title ?? '')}
        </Link>
    </footer>;
};
