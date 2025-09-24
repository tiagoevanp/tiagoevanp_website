import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ExternalLinks } from '../assets/ExternalLinks';
import Tiago from '../assets/images/tiago.jpg'; // cSpell:words tiago
import { Button, Image, TextContainer } from '../components';
import { Navbar, NavbarLink } from '../components/Navbar';
import { useTheme } from '../providers/hooks/useTheme';

export const Home = () => {
    const { t } = useTranslation();
    const { theme, colors, setTheme } = useTheme();

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
                height: '100%',
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
                marginInline: '32px',
            }),
            section: css({
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }),
            footer: css({
                display: 'flex',
                alignItems: 'center',
                padding: '32px',
                paddingBlockStart: 0,
            }),
        }),
        [colors.page.background],
    );

    return (
        <div className='fade-colors-transition' css={styles.page}>
            <Navbar>
                <div css={styles.navbarItems}>
                    <NavbarLink to='test'>
                        {t('Link 1')}
                    </NavbarLink>
                    <NavbarLink to='test'>
                        {t('Link 2')}
                    </NavbarLink>
                    <NavbarLink to='test'>
                        {t('Link 3')}
                    </NavbarLink>
                </div>
                <div css={styles.navbarItems}>
                    <Button
                        icon='github'
                        onClick={() => { window.open(ExternalLinks.github, '_blank')!.focus(); }}
                    />
                    <Button
                        icon='linkedin'
                        onClick={() => { window.open(ExternalLinks.linkedin, '_blank')!.focus(); }}
                    />
                    <Button
                        icon={theme === 'dark' ? 'sun' : 'moon'}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                </div>
            </Navbar>
            <section css={styles.section}>
                <Image
                    src={Tiago}
                    alt={t('tiago_photo')}
                    style={{
                        marginInline: '128px',
                        maxHeight: '512px',
                        maxWidth: '512px',
                        flexShrink: 0,
                        rotate: '-5deg',
                    }}
                />
                <TextContainer
                    title={t('welcome')}
                    paragraph={t('lorem_ipsum')}
                    style={{ marginInlineEnd: '126px' }}
                />
            </section>
        </div>
    );
};
