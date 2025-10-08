import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import styles from './NavbarLink.module.sass';

type NavbarLinkProps = PropsWithChildren<{
    className?: string;
    to: string
}>;

export const NavbarLink = ({ children, to, className }: NavbarLinkProps) => {
    return <Link href={to} className={`fade-colors-transition ${styles.navlink} ${className ?? ''}`}>
        {children}
    </Link>;
};
