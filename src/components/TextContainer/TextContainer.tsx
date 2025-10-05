import styles from './TextContainer.module.sass';

type TextContainerProps = {
    title?: string;
    subtitle?: string;
    paragraph: string;
};

export const TextContainer = ({ title, subtitle, paragraph }: TextContainerProps) => {
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
            <p className={styles.paragraph}>
                {paragraph}
            </p>
        </section>
    );
};
