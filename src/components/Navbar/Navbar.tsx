import type { PropsWithChildren } from 'react';

import { useTranslation } from '@/i18n/client';

import styles from './Navbar.module.sass';

type NavbarProps = PropsWithChildren;

export const Navbar = ({ children }: NavbarProps) => {
    const { t } = useTranslation();
    return <nav aria-label={t('navbar.aria_label')} className={styles.navbar}>
        {children}
    </nav>;
};
