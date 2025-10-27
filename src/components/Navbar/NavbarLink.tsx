import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import styles from './NavbarLink.module.sass';

type NavbarLinkProps = PropsWithChildren<{
    to: string
    className?: string;
    onClick?: () => void;
}>;

export const NavbarLink = ({ children, to, className, onClick }: NavbarLinkProps) => {
    return <Link href={to} onClick={onClick} className={`fade-colors-transition ${styles.navlink} ${className ?? ''}`}>
        {children}
    </Link>;
};
