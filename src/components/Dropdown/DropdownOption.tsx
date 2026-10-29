import { KeyboardEvent, useCallback } from 'react';

import styles from './DropdownOption.module.sass';

type DropdownOptionProps = {
    children: string;
    onClick: () => void;
    // When set, the option is a radio item and shows a check mark while selected
    checked?: boolean;
    lang?: string;
};

export const DropdownOption = ({ onClick, children, checked, lang }: DropdownOptionProps) => {
    const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            onClick();
        }
    }, [onClick]);
    const isRadio = checked !== undefined;

    return <div
        className={styles.option}
        tabIndex={0}
        role={isRadio ? 'menuitemradio' : 'menuitem'}
        aria-checked={isRadio ? checked : undefined}
        onClick={onClick}
        onKeyDown={onKeyDown}
    >
        {isRadio && <span className={styles.check} aria-hidden>{checked ? '✓' : ''}</span>}
        <span lang={lang}>{children}</span>
    </div>;
};
