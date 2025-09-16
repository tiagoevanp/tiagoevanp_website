import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type ImageProps = {
    src: string;
    style?: React.CSSProperties;
    alt?: string;
};

export const Image = ({ src, style: propStyle, alt }: ImageProps) => {
    const { colors, uiUtils } = useTheme();

    const style = useMemo(() => css({
        border: `16px solid ${colors.border}`,
        borderRadius: '0 50% 0 50%',
        boxShadow: uiUtils.shadow,
        ...propStyle,
    }), [colors.border, propStyle, uiUtils.shadow]);

    return (
        <img src={src} alt={alt} css={style} />
    );
};
