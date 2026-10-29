import type { ReactNode } from 'react';

import styles from './TextContainer.module.sass';

type TextContainerProps = {
    title?: string;
    // A list renders as parts separated by "|" that never leave a separator at a line start or end
    subtitle?: string | string[];
    aside?: ReactNode;
    paragraph: string;
    // Rendered after the paragraph, e.g. calls to action
    actions?: ReactNode;
};

export const TextContainer = ({ title, subtitle, aside, paragraph, actions }: TextContainerProps) => {
    return (
        <section className={styles.container}>
            {title && (
                <h1 className={styles.title}>
                    {title}
                </h1>
            )}
            {subtitle && (
                <h2 className={styles.subtitle}>
                    {Array.isArray(subtitle)
                        ? (
                            <span className={styles['subtitle-parts']}>
                                {subtitle.map(part => (
                                    <span key={part} className={styles['subtitle-part']}>
                                        {part}
                                    </span>
                                ))}
                            </span>
                        )
                        : subtitle}
                </h2>
            )}
            {aside}
            <p className={styles.paragraph}>
                {paragraph}
            </p>
            {actions}
        </section>
    );
};
