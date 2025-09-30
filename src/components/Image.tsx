import { css } from '@emotion/react';
import { type CSSProperties, useMemo } from 'react';

import { useTheme } from '../providers/hooks/useTheme';

type ImageProps = {
    src: string;
    containerStyle?: CSSProperties;
    imageStyle?: CSSProperties;
    alt?: string;
    onClick?: () => void;
};

export const Image = ({
    src, containerStyle: cssContainerObject,
    imageStyle: cssImageObject,
    alt,
    onClick,
}: ImageProps) => {
    const { colors, uiUtils } = useTheme();

    const cssContainerStyle = useMemo(() => css({
        ...cssContainerObject,
        // boxShadow: uiUtils.shadow,

        '--bg-first-color': colors.home.image.primaryBackground,
        '--bg-second-color': colors.home.image.secondaryBackground,
    }), [
        colors.home.image.primaryBackground,
        colors.home.image.secondaryBackground,
        cssContainerObject,
        // uiUtils.shadow,
    ]);

    const cssImageStyle = css({
        ...cssImageObject,
        boxShadow: uiUtils.shadow,
    });

    return (
        <div className='background-bars' css={cssContainerStyle}>
            <img
                css={cssImageStyle}
                style={{ width: '100%', height: '100%', verticalAlign: 'middle' }}
                src={src}
                alt={alt}
                onClick={onClick}
            />
        </div>
    );
};
