import styles from './Tag.module.sass';

type TagProps = {
    children: string;
};

export const Tag = ({ children }: TagProps) => <span className={styles.tag}>{children}</span>;
