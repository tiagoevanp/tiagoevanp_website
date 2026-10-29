import { PropsWithChildren } from 'react';

import styles from './Dropdown.module.sass';

type DropdownProps = PropsWithChildren<{
    name: string;
}>;

// A plain list of buttons that the toggle discloses, so Tab and Enter/Space are the whole keyboard pattern
export const Dropdown = ({ name, children }: DropdownProps) => {
    return <ul className={styles.dropdown} id={name}>{children}</ul>;
};
