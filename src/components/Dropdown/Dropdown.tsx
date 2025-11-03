import { PropsWithChildren } from 'react';

import styles from './Dropdown.module.sass';

type DropdownProps = PropsWithChildren<{
    name: string;
}>;

export const Dropdown = ({ name, children }: DropdownProps) => {
    return <div className={styles.dropdown} role='listbox' id={name}>{children}</div>;
};
