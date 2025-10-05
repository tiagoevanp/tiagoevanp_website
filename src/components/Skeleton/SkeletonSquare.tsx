import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

type SkeletonProps = {
    style: CSSProperties
};

export const SkeletonSquare = ({ style: cssObject }: SkeletonProps) => {
    const cssStyle = css({
        backgroundColor: 'gray',
        ...cssObject,
    });

    return <div css={cssStyle}>loading</div>;

};
