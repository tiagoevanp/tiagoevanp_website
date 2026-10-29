import styles from './DropdownOption.module.sass';

type DropdownOptionProps = {
    children: string;
    onClick: () => void;
    // When set, the option is a toggle button and shows a check mark while selected
    selected?: boolean;
    lang?: string;
};

export const DropdownOption = ({ onClick, children, selected, lang }: DropdownOptionProps) => {
    const isToggle = selected !== undefined;

    return <li>
        <button
            type='button'
            className={styles.option}
            aria-pressed={isToggle ? selected : undefined}
            onClick={onClick}
        >
            {isToggle && <span className={styles.check} aria-hidden>{selected ? '✓' : ''}</span>}
            <span lang={lang}>{children}</span>
        </button>
    </li>;
};
