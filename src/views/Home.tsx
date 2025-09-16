import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ExternalLinks } from '../assets/ExternalLinks';
import Tiago from '../assets/images/tiago.jpg';
import { Image, TextContainer } from '../components';
import { Button } from '../components/Button';
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
                backgroundColor: colors.background,
            }),
            header: css({
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '64px',
                paddingBlockEnd: '0',
                gap: '64px',
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
        [colors],
    );

    return (
        <div className='fade-background-transition' css={styles.page}>
            <header css={styles.header}>
                <Button
                    transparent
                    icon='github'
                    onClick={() => { window.open(ExternalLinks.github, '_blank')!.focus(); }}
                />
                <Button
                    transparent
                    icon='linkedin'
                    onClick={() => { window.open(ExternalLinks.linkedin, '_blank')!.focus(); }}
                />
                <Button
                    transparent
                    icon={theme === 'dark' ? 'sun' : 'moon'}
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                />
            </header>
            <section css={styles.section}>
                <Image
                    src={Tiago}
                    alt={t('tiago_photo')}
                    style={{ marginInline: '126px', maxHeight: '512px', maxWidth: '512px', flexShrink: 0 }}
                />
                <TextContainer title={t('welcome')} paragraph={t('lorem_ipsum')} style={{ marginInlineEnd: '126px' }} />
            </section>
            <footer css={styles.footer}>
                <Button
                    icon='burger'
                    onClick={() => { }}
                />
            </footer>
        </div>
    );
};
