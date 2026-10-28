'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PropsWithChildren, startTransition, useEffect, useState } from 'react';

import { Banner, Button, Dropdown, DropdownOption, Navbar, NavbarLink } from '@/components';
import {
    changeSkillDocLanguage,
    getSkillDocLanguage,
    getSkillDocPath,
    saveLanguage,
    useTranslation,
} from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';
import { useScreenContext } from '@/providers/hooks/useScreenContext';

import styles from './PageNavbar.module.sass';

let latestPick = 0;

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t, i18n: { language, changeLanguage, loadLanguages } } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { isMobile } = useScreenContext();
    const path = usePathname();
    const router = useRouter();
    const [toggleThemeIcon, setToggleThemeIcon] = useState<'sun' | 'moon'>('moon');
    const [mobileDropdownIsOpen, setMobileDropdownOpen] = useState(false);
    const [languageDropdownIsOpen, setLanguageDropdownOpen] = useState(false);

    const selectLanguage = async (newLanguage: string) => {
        const pick = ++latestPick;

        saveLanguage(newLanguage);
        setLanguageDropdownOpen(false);

        if (getSkillDocLanguage(path)) {
            const { pathname: pickPathname, search, hash } = window.location;
            const target = `${getSkillDocPath(path, newLanguage)}${search}${hash}`;

            router.prefetch(target);
            await loadLanguages(newLanguage).catch(() => undefined);

            if (pick !== latestPick || window.location.pathname !== pickPathname) return;

            startTransition(() => {
                changeSkillDocLanguage(newLanguage);
                router.push(target);
            });

            return;
        }

        changeLanguage(newLanguage);
    };

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
                    icon='ellipsis'
                    description={t('navbar.button_ellipsis')}
                    variant='medium'
                    aria-expanded={mobileDropdownIsOpen}
                    aria-controls='mobile-menu'
                    onClick={() => {
                        setMobileDropdownOpen((value) => !value);
                    }}
                />
            }
            <ul style={{ justifyContent: 'flex-end' }} className={styles['navbar-list']}>
                <li>
                    <Button
                        icon='github'
                        description={t('navbar.button_github')}
                        variant='medium'
                        href={ExternalLinks.github}
                    />
                </li>
                <li>
                    <Button
                        icon='linkedin'
                        description={t('navbar.button_linkedin')}
                        variant='medium'
                        href={ExternalLinks.linkedin}
                    />
                </li>
                <li>
                    <Button
                        icon={toggleThemeIcon}
                        description={t('navbar.button_theme')}
                        variant='medium'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
                <li>
                    <Button
                        icon='language'
                        description={t('navbar.button_language')}
                        variant='medium'
                        aria-expanded={languageDropdownIsOpen}
                        aria-controls='language'
                        onClick={() => setLanguageDropdownOpen((value) => !value)}
                    />
                </li>
            </ul>
        </Navbar>
        <div className={styles['dropdown-container']}>
            {languageDropdownIsOpen &&
                <Dropdown name="language">
                    <DropdownOption onClick={() => selectLanguage('en')}>
                        {t('navbar.english')}
                    </DropdownOption>
                    <DropdownOption onClick={() => selectLanguage('pt-BR')}>
                        {t('navbar.portuguese')}
                    </DropdownOption>
                </Dropdown>
            }
            {mobileDropdownIsOpen && <nav id='mobile-menu' className={styles['mobile-dropdown']}>
                <ul className='fade-colors-transition'>
                    <li>
                        <Link href='/' onClick={() => setMobileDropdownOpen(false)}>
                            {t('navbar.home_link')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/skill-docs/semantic/${language}`}
                            onClick={() => setMobileDropdownOpen(false)}
                        >
                            {t('navbar.skills_link')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/experience'}
                            onClick={() => setMobileDropdownOpen(false)}
                        >
                            {t('navbar.experience')}
                        </Link>
                    </li>
                </ul>
            </nav>}
        </div>
        <div className={styles['banner-container']}>
            {path.match('/skill-docs') && <Banner message={t('page_under_construction')} variant='warning' />}
        </div>
        <main className={styles.content}>
            {children}
        </main>
    </div>;
};
