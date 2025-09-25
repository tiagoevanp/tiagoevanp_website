import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ExternalLinks } from '../assets/ExternalLinks';
import Tiago from '../assets/images/tiago.jpg'; // cSpell:words tiago
import { Button, Image, TextContainer } from '../components';
import { Navbar, NavbarLink } from '../components/Navbar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useTheme } from '../providers/hooks/useTheme';

export const Home = () => {
    const { t } = useTranslation();
    const { theme, colors, setTheme } = useTheme();
    const size = useMediaQuery();

    const styles = useMemo(
        () => ({
            page: css({
                display: 'flex',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
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
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }),
        }),
        [colors.page.background],
    );

    return (
        <div className='fade-colors-transition' css={styles.page}>
            <Navbar>
                <ul css={styles.navbarItems}>
                    {
                        size === 'large'
                            ? <>
                                <li>
                                    <NavbarLink to='/test'>
                                        {t('Link 1')}
                                    </NavbarLink>
                                </li>
                                <li>
                                    <NavbarLink to='/test2'>
                                        {t('Link 2')}
                                    </NavbarLink>
                                </li>
                                <li>
                                    <NavbarLink to='/test3'>
                                        {t('Link 3')}
                                    </NavbarLink>
                                </li>
                            </>
                            : <Button icon='burger' onClick={() => {}} />
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
                <Image
                    style={{
                        marginInline: '128px',
                        maxHeight: '512px',
                        maxWidth: '512px',
                        flexShrink: 0,
                        rotate: '-5deg',
                    }}
                    src={Tiago}
                    alt={t('tiago_photo')}
                />
                <TextContainer
                    title={t('welcome')}
                    paragraph={t('lorem_ipsum')}
                    style={{ marginInlineEnd: '126px' }}
                />
            </div>
        </div>
    );
};
