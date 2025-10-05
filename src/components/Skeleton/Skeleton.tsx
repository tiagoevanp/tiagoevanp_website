import type { CSSProperties } from 'react';

import { SkeletonSquare } from './SkeletonSquare';

type SkeletonProps = {
    square?: boolean;
    style: CSSProperties
};

export const Skeleton = ({ square, style }: SkeletonProps) => {

    if (square) {
        return <SkeletonSquare style={style} />;
    }
};
