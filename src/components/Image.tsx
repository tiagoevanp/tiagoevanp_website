import { css } from '@emotion/react';
import { type CSSProperties, useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type ImageProps = {
    src: string;
    style?: CSSProperties;
    alt?: string;
    onClick?: () => void;
};

export const Image = ({ src, style: cssObject, alt, onClick }: ImageProps) => {
    const { uiUtils } = useTheme();

    const cssStyle = useMemo(() => css({
        boxShadow: uiUtils.shadow,
        ...cssObject,
    }), [cssObject, uiUtils.shadow]);

    return (
        <div css={cssStyle}>
            <img css={css({ width: '100%', height: '100%' })} src={src} alt={alt} onClick={onClick} />
        </div>
    );
};
