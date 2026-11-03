'use client';

import { ComponentProps, isValidElement, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { useTranslation } from '@/i18n/client';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './CodeBlock.module.sass';

// The display names of the fence languages the articles use (lowercase in the MDX)
const languageNames: Record<string, string> = {
    js: 'JavaScript',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'Sass',
    html: 'HTML',
};

// How long "Copied" stays on the button
const copiedDuration = 2000;

// From the code element's language-* class, which the MDX fence sets
const getLanguage = (children: React.ReactNode) => {
    if (!isValidElement<{ className?: string }>(children)) return undefined;

    const language = children.props.className?.split(' ')
        .find((name) => name.startsWith('language-'))
        ?.slice('language-'.length);

    return language ? languageNames[language] ?? language.toUpperCase() : undefined;
};

// The Clipboard API never appears or goes away while the page is open, so there's nothing to subscribe to
const subscribe = () => () => {};

// Missing outside secure contexts (plain http) and in some embedded browsers. The static HTML has no button: it
// can't work before the page is hydrated anyway
const hasClipboard = () => typeof navigator.clipboard?.writeText === 'function';

// An article code block (the MDX pre): a header with the language and a copy button above the code, in one frame.
// The pre still scrolls on its own and gets a Tab stop when it overflows (see SkillDocsLayout); the copy button
// comes before it in the tab order
export const CodeBlock = ({ children, ...props }: ComponentProps<'pre'>) => {
    const { t } = useTranslation();
    const preRef = useRef<HTMLPreElement>(null);
    const timeoutRef = useRef<number>(undefined);
    const [copied, setCopied] = useState(false);
    const canCopy = useSyncExternalStore(subscribe, hasClipboard, () => false);
    const language = getLanguage(children);

    useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

    const copy = async () => {
        // The text the reader sees: the highlighted tokens' text, line breaks included
        const text = preRef.current?.querySelector('code')?.textContent ?? '';

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // Permission denied or the page lost focus: nothing was copied, so nothing is confirmed
            return;
        }

        setCopied(true);
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => setCopied(false), copiedDuration);
    };

    return (
        <div className={styles.frame}>
            <div className={styles.header}>
                {language && <span className={styles.language}>{language}</span>}
                {canCopy && <button
                    type='button'
                    className={styles.copy}
                    aria-label={language
                        ? t('skill_docs.code.copy_label', {
                            language,
                            // React escapes the label, so i18next must not escape it too
                            interpolation: { escapeValue: false },
                        })
                        : undefined}
                    onClick={copy}
                >
                    <SvgIcon name={copied ? 'check' : 'copy'} variant='small' className={styles['copy-icon']} />
                    {copied ? t('skill_docs.code.copied') : t('skill_docs.code.copy')}
                </button>}
            </div>
            <pre ref={preRef} {...props} className={props.className ? `${styles.pre} ${props.className}` : styles.pre}>
                {children}
            </pre>
            {/* Always rendered, so screen readers are already watching it when the confirmation appears */}
            <span role='status' className={styles['visually-hidden']}>
                {copied ? t('skill_docs.code.copied') : ''}
            </span>
        </div>
    );
};
