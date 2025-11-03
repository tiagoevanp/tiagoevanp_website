import { KeyboardEvent, useCallback } from 'react';

import styles from './DropdownOption.module.sass';

type DropdownOptionProps = {
    children: string;
    onClick: () => void;
};

export const DropdownOption = ({ onClick, children }: DropdownOptionProps) => {
    const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            onClick();
        }
    }, [onClick]);
    return <div className={styles.option} tabIndex={0} role="menuitem" onClick={onClick} onKeyDown={onKeyDown}>
        {children}
    </div>;
};
