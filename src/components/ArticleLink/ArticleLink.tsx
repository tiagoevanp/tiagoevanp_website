'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

import { useTranslation } from '@/i18n/client';
import { siteUrl } from '@/lib/seo';

import { svgPaths, viewBox } from '../SvgIcon/icons';
import styles from './ArticleLink.module.sass';

type ArticleLinkProps = {
    href?: string;
    children: ReactNode;
    className?: string;
};

// The site answers on http and https, with and without www (both redirect to siteUrl)
const siteHost = new URL(siteUrl).hostname.replace(/^www\./, '');
const siteHosts = [siteHost, `www.${siteHost}`];

// Only http(s) and protocol-relative (//…) links to another site count as external; links to this site are taken
// as paths. URL lowercases the protocol and host, so the comparison ignores case
const toExternalOrPath = (href: string): { external: boolean; path?: string } => {
    if (!/^(https?:)?\/\//i.test(href)) return { external: false };

    try {
        const url = new URL(href, siteUrl);

        if (siteHosts.includes(url.hostname)) {
            return { external: false, path: `${url.pathname}${url.search}${url.hash}` };
        }
    } catch {
        // not a valid URL: still leaves the site
    }

    return { external: true };
};

// A link in an article. Links to other sites open in a new tab and say so, to sighted users with an icon and to
// screen readers with hidden text; links within the site and to sections of the page open in the same tab
export const ArticleLink = ({ href = '', children, className }: ArticleLinkProps) => {
    const { t } = useTranslation();
    const { external, path = href } = toExternalOrPath(href);

    if (external) {
        return (
            <a className={className} href={href} target='_blank' rel='noopener noreferrer'>
                {children}
                <svg
                    className={styles.icon}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox={`0 0 ${viewBox['external-link'].x} ${viewBox['external-link'].y}`}
                    aria-hidden
                    focusable='false'
                >
                    <path d={svgPaths['external-link']} />
                </svg>
                <span className={styles['visually-hidden']}>{` ${t('skill_docs.opens_in_new_tab')}`}</span>
            </a>
        );
    }

    // next/link for pages of the site (client-side navigation); a plain link for #sections, mailto: and the like
    if (path.startsWith('/') && !path.startsWith('//')) {
        return <Link className={className} href={path}>{children}</Link>;
    }

    return <a className={className} href={path}>{children}</a>;
};
