'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Banner, Button, Navbar, NavbarLink } from '@/components';
import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';
import { useScreenContext } from '@/providers/hooks/useScreenContext';

import styles from './PageNavbar.module.sass';

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t, i18n: { language } } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { isMobile } = useScreenContext();
    const path = usePathname();
    const [toggleThemeIcon, setToggleThemeIcon] = useState<'sun' | 'moon'>('moon');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setToggleThemeIcon(theme === 'dark' ? 'sun' : 'moon');
    }, [theme]);

    return <div className={`fade-colors-transition ${styles.page}`}>
        <Navbar>
            {!isMobile
                ? <ul className={styles['navbar-list']}>
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
                    <li>
                        <NavbarLink
                            to={'/experience'}
                            className={path.match('/experience') !== null ? styles['navbar-link-active'] : ''}
                        >
                            {t('navbar.experience')}
                        </NavbarLink>
                    </li>
                </ul>
                : <Button
                    className={styles['ellipsis-button']}
                    role='menuitem'
                    icon='ellipsis'
                    description={t('navbar.button_ellipsis')}
                    variant='large'
                    onClick={() => {
                        setIsOpen((value) => !value);
                    }}
                />
            }
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
        {isOpen && <nav className={styles.dropdown}>
            <ul className='fade-colors-transition'>
                <Link href='/' onClick={() => setIsOpen(false)}>
                    <li>
                        {t('navbar.home_link')}
                    </li>
                </Link>
                <Link
                    href={`/skill-docs/semantic/${language}`}
                    onClick={() => setIsOpen(false)}
                >
                    <li>
                        {t('navbar.skills_link')}
                    </li>
                </Link>
                <Link
                    href={'/experience'}
                    onClick={() => setIsOpen(false)}
                >
                    <li>
                        {t('navbar.experience')}
                    </li>
                </Link>
            </ul>
        </nav>
        }
        {path.match('/skill-docs') && <Banner message={t('page_under_construction')} variant='warning' />}
        <main className={styles.content}>
            {children}
        </main>
    </div>;
};
