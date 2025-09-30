import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

import { ExternalLinks } from '../assets/ExternalLinks';
import { Button, Navbar, NavbarLink } from '../components';
import { Sidebar } from '../components/Sidebar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTheme } from '../providers/hooks/useTheme';

export const App = () => {
    const { t } = useTranslation();
    const { colors, theme, setTheme } = useTheme();
    const size = useMediaQuery();
    const location = useLocation();
    const isSkillDocsRoute = useMemo(() => location.pathname.match(/^\/(skill-docs\/?).*/), [location.pathname]);

    const styles = useMemo(() => ({
        page: css({
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            backgroundColor: colors.page.background,
        }),
        navbarItems: css({
            listStyle: 'none',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
            width: '100%',
            marginInline: '32px',
        }),
        content: css({
            display: 'flex',
            flex: '1 0',
        }),
    }), [colors.page.background]);

    return <div className='fade-colors-transition' css={styles.page}>
        <Navbar>
            <ul css={styles.navbarItems}>
                {
                    size === 'large'
                        ? <>
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
                        </>
                        : <Button icon='bars' onClick={() => {}} />
                }
            </ul>
            <ul style={{ justifyContent: 'flex-end' }} css={styles.navbarItems}>
                <li>
                    <Button
                        icon='github'
                        onClick={() => { window.open(ExternalLinks.github, '_blank')!.focus(); }}
                    />
                </li>
                <li>
                    <Button
                        icon='linkedin'
                        onClick={() => { window.open(ExternalLinks.linkedin, '_blank')!.focus(); }}
                    />
                </li>
                <li>
                    <Button
                        icon={theme === 'dark' ? 'sun' : 'moon'}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </li>
            </ul>
        </Navbar>
        <div css={styles.content}>
            {isSkillDocsRoute && <Sidebar />}
            <Outlet />
        </div>
    </div>;
};
