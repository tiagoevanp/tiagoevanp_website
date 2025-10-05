import type { PropsWithChildren } from 'react';

import styles from './Navbar.module.sass';

type NavbarProps = PropsWithChildren;

export const Navbar = ({ children }: NavbarProps) => {
    return <nav className={styles.navbar}>
        {children}
    </nav>;
};
