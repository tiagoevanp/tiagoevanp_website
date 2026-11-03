'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import { detectLanguage, redirectToLanguageScript } from '@/i18n/detectLanguage';

import styles from './LanguageRedirect.module.sass';

type LanguageRedirectProps = {
    // The page's path without the language, e.g. /experience for /experience/en and /experience/pt-BR
    path: string;
};

// Sends the visitor on to their language's version of the page. The inline script does it before the page
// paints on a full page load; the effect covers a client-side navigation, where React doesn't run scripts
export const LanguageRedirect = ({ path }: LanguageRedirectProps) => {
    useEffect(() => {
        const { search, hash } = window.location;

        window.location.replace(`${path}/${detectLanguage()}${search}${hash}`);
    }, [path]);

    return <>
        <script dangerouslySetInnerHTML={{ __html: redirectToLanguageScript(path) }} />
        <noscript>
            {/* Each language is named in itself, so it reads the same in any UI language */}
            <ul className={styles.languages}>
                <li><Link href={`${path}/en`} hrefLang='en' lang='en'>English</Link></li>
                <li><Link href={`${path}/pt-BR`} hrefLang='pt-BR' lang='pt-BR'>Português (Brasil)</Link></li>
            </ul>
        </noscript>
    </>;
};
