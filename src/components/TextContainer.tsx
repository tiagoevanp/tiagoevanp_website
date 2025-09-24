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
            }),
            text: css({
                '& h1': { color: colors.text.title, ...typography.h1 },
                '& p': { color: colors.text.paragraph, ...typography.p },
                marginInline: '64px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }),
        };
    }, [colors.text, style, typography.h1, typography.p]);

    return (
        <div className='fade-colors-transition' css={styles.container}>
            <div css={styles.text}>
                {title && (
                    <h1 className='fade-colors-transition'>
                        {title}
                    </h1>
                )}
                <p className='fade-colors-transition'>
                    {paragraph}
                </p>
            </div>
        </div>
    );
};
