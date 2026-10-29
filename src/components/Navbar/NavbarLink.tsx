import Link from 'next/link';
import { type PropsWithChildren } from 'react';

import styles from './NavbarLink.module.sass';

type NavbarLinkProps = PropsWithChildren<{
    to: string
    className?: string;
    onClick?: () => void;
    'aria-current'?: 'page';
}>;

export const NavbarLink = ({ children, to, className, onClick, ...props }: NavbarLinkProps) => {
    return <Link
        href={to}
        onClick={onClick}
        className={`fade-colors-transition ${styles.navlink} ${className ?? ''}`}
        aria-current={props['aria-current']}
    >
        {children}
    </Link>;
};
