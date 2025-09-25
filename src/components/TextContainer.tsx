import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type TextContainerProps = {
    title?: string;
    paragraph: string;
    style?: React.CSSProperties;
};

export const TextContainer = ({ title, paragraph, style }: TextContainerProps) => {
    const { colors, typography } = useTheme();

    const styles = useMemo(() => {
        return {
            container: css({
                display: 'flex',
                flexDirection: 'column',
                ...style,

                '& h1, & p': {
                    marginInline: '64px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },

                '& h1': {
                    color: colors.text.title,
                    ...typography.h1,
                },

                '& p': {
                    color: colors.text.paragraph,
                    ...typography.p2,
                },
            }),
        };
    }, [colors.text, style, typography.h1, typography.p2]);

    return (
        <section className='fade-colors-transition fade-in-animation' css={styles.container}>
            {title && (
                <h1 className='fade-colors-transition'>
                    {title}
                </h1>
            )}
            <p className='fade-colors-transition'>
                {paragraph}
            </p>
        </section>
    );
};
