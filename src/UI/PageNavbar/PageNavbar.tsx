'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PropsWithChildren, useEffect, useState } from 'react';

import { Banner, Button, Dropdown, DropdownOption, Navbar, NavbarLink } from '@/components';
import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';
import { useScreenContext } from '@/providers/hooks/useScreenContext';

import styles from './PageNavbar.module.sass';

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t, i18n: { language, changeLanguage } } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { isMobile } = useScreenContext();
    const path = usePathname();
    const [toggleThemeIcon, setToggleThemeIcon] = useState<'sun' | 'moon'>('moon');
    const [mobileDropdownIsOpen, setMobileDropdownOpen] = useState(false);
    const [languageDropdownIsOpen, setLanguageDropdownOpen] = useState(false);

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
                    variant='medium'
                    onClick={() => {
                        setMobileDropdownOpen((value) => !value);
                    }}
                />
            }
            <ul style={{ justifyContent: 'flex-end' }} className={styles['navbar-list']}>
                <li>
                    <Button
                        role='menuitem'
                        icon='github'
                        description={t('navbar.button_github')}
                        variant='medium'
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
                        variant='medium'
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
                        variant='medium'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
                <li>
                    <Button
                        role='menuitem'
                        icon='language'
                        description={t('navbar.button_language')}
                        variant='medium'
                        onClick={() => setLanguageDropdownOpen((value) => !value)}
                    />
                </li>
            </ul>
        </Navbar>
        <div className={styles['dropdown-container']}>
            {languageDropdownIsOpen &&
                <Dropdown name="language">
                    <DropdownOption onClick={() => {changeLanguage('en'); setLanguageDropdownOpen(false);}}>
                        {t('navbar.english')}
                    </DropdownOption>
                    <DropdownOption onClick={() => {changeLanguage('pt-BR'); setLanguageDropdownOpen(false);}}>
                        {t('navbar.portuguese')}
                    </DropdownOption>
                </Dropdown>
            }
            {mobileDropdownIsOpen && <nav className={styles['mobile-dropdown']}>
                <ul className='fade-colors-transition'>
                    <Link href='/' onClick={() => setMobileDropdownOpen(false)}>
                        <li>
                            {t('navbar.home_link')}
                        </li>
                    </Link>
                    <Link
                        href={`/skill-docs/semantic/${language}`}
                        onClick={() => setMobileDropdownOpen(false)}
                    >
                        <li>
                            {t('navbar.skills_link')}
                        </li>
                    </Link>
                    <Link
                        href={'/experience'}
                        onClick={() => setMobileDropdownOpen(false)}
                    >
                        <li>
                            {t('navbar.experience')}
                        </li>
                    </Link>
                </ul>
            </nav>}
        </div>
        {path.match('/skill-docs') && <Banner message={t('page_under_construction')} variant='warning' />}
        <main className={styles.content}>
            {children}
        </main>
    </div>;
};
