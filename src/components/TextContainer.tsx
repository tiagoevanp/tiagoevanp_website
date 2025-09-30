import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type TextContainerProps = {
    title?: string;
    subtitle?: string;
    paragraph: string;
};

export const TextContainer = ({ title, subtitle, paragraph }: TextContainerProps) => {
    const { colors, typography } = useTheme();

    const styles = useMemo(() => {
        return {
            container: css({
                display: 'flex',
                flex: '1 4 auto',
                flexDirection: 'column',
                minWidth: '300px',

                '& h1': {
                    width: 'fit-content',
                    color: colors.section.text.title.color,
                    ...typography.h1,
                },

                '& h2': {
                    color: colors.section.text.color,
                    ...typography.h2,
                },

                '& p': {
                    color: colors.section.text.color,
                    ...typography.p,
                },
            }),
        };
    }, [colors.section.text.color, colors.section.text.title.color, typography.h1, typography.h2, typography.p]);

    return (
        <section className='fade-colors-transition fade-in-animation' css={styles.container}>
            {title && (
                <h1 className='fade-colors-transition'>
                    {title}
                </h1>
            )}
            {subtitle && (
                <h2 className='fade-colors-transition'>
                    {subtitle}
                </h2>
            )}
            <p className='fade-colors-transition'>
                {paragraph}
            </p>
        </section>
    );
};
