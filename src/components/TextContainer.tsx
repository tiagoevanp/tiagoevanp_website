import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type TextContainerProps = {
    title?: string;
    paragraph: string;
    style?: React.CSSProperties;
};

export const TextContainer = ({ title, paragraph, style }: TextContainerProps) => {
    const { colors, typography, uiUtils } = useTheme();

    const styles = useMemo(() => {
        return {
            container: css({
                border: `16px solid ${colors.border}`,
                backgroundColor: colors.backgroundContainer,
                borderRadius: '256px 0 256px 0',
                color: colors.paragraph,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: uiUtils.shadow,
                ...style,
            }),
            text: css({
                '& h1': typography.h1,
                '& p': typography.p,
                marginBlock: '64px',
                marginInline: '128px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }),
        };
    }, [
        colors.backgroundContainer,
        colors.border,
        colors.paragraph,
        style,
        typography.h1,
        typography.p,
        uiUtils.shadow,
    ]);

    return (
        <div css={styles.container}>
            <div css={styles.text}>
                {title && (
                    <h1>
                        {title}
                    </h1>
                )}
                <p>
                    {paragraph}
                </p>
            </div>
        </div>
    );
};
