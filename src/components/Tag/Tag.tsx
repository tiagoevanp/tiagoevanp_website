import styles from './Tag.module.sass';

type TagProps = {
    children: string;
} & (
    | { pressed?: never; onClick?: never }
    // With onClick it renders a toggle button, announced as pressed or not
    | { pressed: boolean; onClick: () => void }
);

export const Tag = ({ children, pressed, onClick }: TagProps) => onClick
    ? <button
        type='button'
        className={`${styles.tag} ${styles.toggle}`}
        aria-pressed={pressed}
        onClick={onClick}
    >
        {children}
    </button>
    : <span className={styles.tag}>{children}</span>;
