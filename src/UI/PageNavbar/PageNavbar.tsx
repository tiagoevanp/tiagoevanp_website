'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Button, Navbar, NavbarLink } from '@/components';
import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';

import styles from './PageNavbar.module.sass';

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t, i18n: { language } } = useTranslation();
    const { theme, setTheme } = useTheme();
    const path = usePathname();
    const [toggleThemeIcon, setToggleThemeIcon] = useState<'sun' | 'moon'>('moon');

    useEffect(() => {
        setToggleThemeIcon(theme === 'dark' ? 'sun' : 'moon');
    }, [theme]);

    return <div className={`fade-colors-transition ${styles.page}`}>
        <Navbar>
            <ul className={styles['navbar-list']}>
                <li>
                    <NavbarLink to='/' className={path === '/' ? styles['navbar-link-active'] : ''}>
                        {t('navbar.home_link')}
                    </NavbarLink>
                </li>
                <li>
                    <NavbarLink
                        to={`/skill-docs/semantic/${language}`}
                        className={path.match('/skill-docs') !== null ? styles['navbar-link-active'] : ''}
                    >
                        {t('navbar.skills_link')}
                    </NavbarLink>
                </li>
            </ul>
            <ul style={{ justifyContent: 'flex-end' }} className={styles['navbar-list']}>
                <li>
                    <Button
                        role='menuitem'
                        icon='github'
                        description={t('navbar.button_github')}
                        variant='large'
                        onClick={() => {
                            window.open(ExternalLinks.github, '_blank', 'noopener, noreferrer');
                        }}
                    />
                </li>
                <li>
                    <Button
                        role='menuitem'
                        icon='linkedin'
                        description={t('navbar.button_linkedin')}
                        variant='large'
                        onClick={() => {
                            window.open(ExternalLinks.linkedin, '_blank', 'noopener, noreferrer');
                        }}
                    />
                </li>
                <li>
                    <Button
                        role='menuitem'
                        icon={toggleThemeIcon}
                        description={t('navbar.button_theme')}
                        variant='large'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
            </ul>
        </Navbar>
        <main className={styles.content}>
            {children}
        </main>
    </div>;
};
