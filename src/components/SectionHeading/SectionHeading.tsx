'use client';

import { isValidElement, ReactNode } from 'react';

import { useTranslation } from '@/i18n/client';

import styles from './SectionHeading.module.sass';

type SectionHeadingProps = {
    // From the heading's text (src/lib/headingIds.mjs); without one there is nothing to link to
    id?: string;
    children: ReactNode;
    className?: string;
    containerClassName?: string;
};

// The heading's text for the anchor's label, including inline code and emphasis
const toText = (node: ReactNode): string => {
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(toText).join('');
    if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);

    return '';
};

// An article section heading with a "#" link to itself. The link is next to the heading, not inside it, so screen
// readers don't add its label to the heading's name and the heading itself is never a link
export const SectionHeading = ({ id, children, className, containerClassName }: SectionHeadingProps) => {
    const { t } = useTranslation();

    return (
        <div className={containerClassName ? `${styles.container} ${containerClassName}` : styles.container}>
            <h2 id={id} className={className ? `${styles.heading} ${className}` : styles.heading}>{children}</h2>
            {id && <a
                className={styles.anchor}
                href={`#${id}`}
                aria-label={t('skill_docs.section_link', {
                    title: toText(children),
                    // React escapes the label, so i18next must not escape it too ("&" would read as "&amp;")
                    interpolation: { escapeValue: false },
                })}
            >
                #
            </a>}
        </div>
    );
};
