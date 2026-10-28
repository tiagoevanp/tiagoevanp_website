import type { ReactNode } from 'react';

import styles from './TextContainer.module.sass';

type TextContainerProps = {
    title?: string;
    subtitle?: string;
    aside?: ReactNode;
    paragraph: string;
};

export const TextContainer = ({ title, subtitle, aside, paragraph }: TextContainerProps) => {
    return (
        <section className={styles.container}>
            {title && (
                <h1 className={styles.title}>
                    {title}
                </h1>
            )}
            {subtitle && (
                <h2 className={styles.subtitle}>
                    {subtitle}
                </h2>
            )}
            {aside}
            <p className={styles.paragraph}>
                {paragraph}
            </p>
        </section>
    );
};
