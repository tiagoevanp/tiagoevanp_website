import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type ImageProps = {
    src: string;
    style?: React.CSSProperties;
    alt?: string;
    onClick?: () => void;
};

export const Image = ({ src, style: propStyle, alt, onClick }: ImageProps) => {
    const { uiUtils } = useTheme();

    const style = useMemo(() => css({
        boxShadow: uiUtils.shadow,
        ...propStyle,
    }), [propStyle, uiUtils.shadow]);

    return (
        <img src={src} alt={alt} css={style} onClick={onClick} />
    );
};
