'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { PropsWithChildren, startTransition, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { Banner, Dropdown, DropdownOption, IconButton, Navbar, NavbarLink } from '@/components';
import {
    changeSkillDocLanguage,
    getSkillDocLanguage,
    getSkillDocPath,
    saveLanguage,
    useTranslation,
} from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';
import { useScreenContext } from '@/providers/hooks/useScreenContext';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';

import styles from './PageNavbar.module.sass';

let latestPick = 0;

// Nothing to subscribe to: only tells hydration (server snapshot) apart from later renders
const subscribeToNothing = () => () => {};

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t, i18n: { language, changeLanguage, loadLanguages } } = useTranslation();
    const { resolvedTheme, setTheme } = useTheme();
    const { isTablet, isDesktop } = useScreenContext();
    const { isOpen: sidebarIsOpen, setOpen: setSidebarOpen } = useSidebarContext();
    const path = usePathname();
    const router = useRouter();
    const isHydrated = useSyncExternalStore(subscribeToNothing, () => true, () => false);
    const [mobileDropdownIsOpen, setMobileDropdownOpen] = useState(false);
    const [languageDropdownIsOpen, setLanguageDropdownOpen] = useState(false);
    const [previousSidebarIsOpen, setPreviousSidebarIsOpen] = useState(sidebarIsOpen);
    const languageToggleRef = useRef<HTMLButtonElement>(null);
    const languageItemRef = useRef<HTMLLIElement>(null);

    // Undefined until hydrated, so the server and first client render match.
    // resolvedTheme follows the OS while the visitor hasn't picked a theme
    const isDarkTheme = !isHydrated || resolvedTheme === undefined ? undefined : resolvedTheme === 'dark';

    const isHomePage = path === '/';
    const isSkillDocsPage = path.match('/skill-docs') !== null;
    const isExperiencePage = path.match('/experience') !== null;

    // CSS hides the menu button and menu above phone widths, so close the menu when resized past them
    if (mobileDropdownIsOpen && (isTablet || isDesktop)) {
        setMobileDropdownOpen(false);
    }

    // Only one overlay at a time: opening the skill-docs sidebar drawer closes the navbar menus
    if (sidebarIsOpen !== previousSidebarIsOpen) {
        setPreviousSidebarIsOpen(sidebarIsOpen);

        if (sidebarIsOpen) {
            setMobileDropdownOpen(false);
            setLanguageDropdownOpen(false);
        }
    }

    // Escape closes the language dropdown. Focus goes back to the toggle unless the visitor has moved on elsewhere
    useEffect(() => {
        if (!languageDropdownIsOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return;

            const focused = document.activeElement;

            setLanguageDropdownOpen(false);

            if (focused === document.body || languageItemRef.current?.contains(focused)) {
                languageToggleRef.current?.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, [languageDropdownIsOpen]);

    const selectLanguage = async (newLanguage: string) => {
        const pick = ++latestPick;

        saveLanguage(newLanguage);
        setLanguageDropdownOpen(false);
        // The picked option unmounts with the dropdown, so keep focus on the toggle
        languageToggleRef.current?.focus();

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

    return <div className={`fade-colors-transition ${styles.page}`}>
        <Navbar>
            {/* Both variants are rendered; CSS shows one per breakpoint so the static HTML matches the screen */}
            <ul className={`${styles['navbar-list']} ${styles['navbar-list-desktop']}`}>
                <li>
                    <NavbarLink
                        to='/'
                        className={isHomePage ? styles['navbar-link-active'] : ''}
                        aria-current={isHomePage ? 'page' : undefined}
                    >
                        {t('navbar.home_link')}
                    </NavbarLink>
                </li>
                <li>
                    <NavbarLink
                        to={`/skill-docs/semantic/${language}`}
                        className={isSkillDocsPage ? styles['navbar-link-active'] : ''}
                        aria-current={isSkillDocsPage ? 'page' : undefined}
                    >
                        {t('navbar.skills_link')}
                    </NavbarLink>
                </li>
                <li>
                    <NavbarLink
                        to={'/experience'}
                        className={isExperiencePage ? styles['navbar-link-active'] : ''}
                        aria-current={isExperiencePage ? 'page' : undefined}
                    >
                        {t('navbar.experience')}
                    </NavbarLink>
                </li>
            </ul>
            <IconButton
                className={styles['ellipsis-button']}
                icon='ellipsis'
                description={t('navbar.button_ellipsis')}
                variant='medium'
                aria-expanded={mobileDropdownIsOpen}
                aria-controls='mobile-menu'
                onClick={() => {
                    setMobileDropdownOpen((value) => !value);
                    setSidebarOpen(false);
                }}
            />
            <ul style={{ justifyContent: 'flex-end' }} className={styles['navbar-list']}>
                <li>
                    <IconButton
                        icon='github'
                        description={t('navbar.button_github')}
                        variant='medium'
                        href={ExternalLinks.github}
                    />
                </li>
                <li>
                    <IconButton
                        icon='linkedin'
                        description={t('navbar.button_linkedin')}
                        variant='medium'
                        href={ExternalLinks.linkedin}
                    />
                </li>
                <li>
                    <IconButton
                        className={styles['theme-button']}
                        icon={isDarkTheme ? 'sun' : 'moon'}
                        description={t('navbar.button_theme')}
                        variant='medium'
                        aria-pressed={isDarkTheme}
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
                {/* The dropdown follows its toggle, so it sits inside the navbar landmark and is next in tab order */}
                <li ref={languageItemRef}>
                    <IconButton
                        ref={languageToggleRef}
                        icon='language'
                        description={t('navbar.button_language')}
                        variant='medium'
                        aria-expanded={languageDropdownIsOpen}
                        aria-controls='language'
                        onClick={() => {
                            setLanguageDropdownOpen((value) => !value);
                            setSidebarOpen(false);
                        }}
                    />
                    {languageDropdownIsOpen &&
                        <Dropdown name="language">
                            {/* Each language is named in itself, so it reads the same in any UI language */}
                            <DropdownOption lang='en' selected={language === 'en'} onClick={() => selectLanguage('en')}>
                                English
                            </DropdownOption>
                            <DropdownOption
                                lang='pt-BR'
                                selected={language === 'pt-BR'}
                                onClick={() => selectLanguage('pt-BR')}
                            >
                                Português (Brasil)
                            </DropdownOption>
                        </Dropdown>
                    }
                </li>
            </ul>
        </Navbar>
        <div className={styles['dropdown-container']}>
            {mobileDropdownIsOpen && <nav id='mobile-menu' className={styles['mobile-dropdown']}>
                <ul className='fade-colors-transition'>
                    <li>
                        <Link
                            href='/'
                            aria-current={isHomePage ? 'page' : undefined}
                            onClick={() => setMobileDropdownOpen(false)}
                        >
                            {t('navbar.home_link')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/skill-docs/semantic/${language}`}
                            aria-current={isSkillDocsPage ? 'page' : undefined}
                            onClick={() => setMobileDropdownOpen(false)}
                        >
                            {t('navbar.skills_link')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/experience'}
                            aria-current={isExperiencePage ? 'page' : undefined}
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
