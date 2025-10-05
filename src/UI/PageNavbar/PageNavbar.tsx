'use client';

import { useTheme } from 'next-themes';
import { PropsWithChildren } from 'react';

import { Button, Navbar, NavbarLink } from '@/components';
import { useTranslation } from '@/i18n/client';
import { ExternalLinks } from '@/lib/ExternalLinks';

import styles from './PageNavbar.module.sass';

export const PageNavbar = ({ children }: PropsWithChildren) => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

    return <div className={`fade-colors-transition ${styles.page}`}>
        <Navbar>
            <ul className={styles['navbar-item']}>
                <li>
                    <NavbarLink to='/'>
                        {t('navbar.home_link')}
                    </NavbarLink>
                </li>
                <li>
                    <NavbarLink to='/skill-docs'>
                        {t('navbar.skills_link')}
                    </NavbarLink>
                </li>
            </ul>
            <ul style={{ justifyContent: 'flex-end' }} className={styles['navbar-item']}>
                <li>
                    <Button
                        icon='github'
                        variant='large'
                        onClick={() => {
                            window.open(ExternalLinks.github, '_blank', 'noopener, noreferrer');
                        }}
                    />
                </li>
                <li>
                    <Button
                        icon='linkedin'
                        variant='large'
                        onClick={() => {
                            window.open(ExternalLinks.linkedin, '_blank', 'noopener, noreferrer');
                        }}
                    />
                </li>
                <li>
                    <Button
                        icon={theme === 'dark' ? 'sun' : 'moon'}
                        variant='large'
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
            </ul>
        </Navbar>
        <div className={styles.content}>
            {children}
        </div>
    </div>;
};
