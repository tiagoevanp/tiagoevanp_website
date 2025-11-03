'use client';

import { NameProp, svgPaths, viewBox } from './icons';
import styles from './SvgIcon.module.sass';

export type SvgIconProps = {
    name: NameProp;
    variant: 'small' | 'medium' | 'large';
    className?: string;
};

export const SvgIcon = ({ name, variant, className }: SvgIconProps) => {
    return (
        <div role='img' className={`${styles[variant]} ${className}`}>
            <svg className={`${styles.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBox[name].x} ${viewBox[name].y}`}>
                <path d={svgPaths[name]} />
            </svg>
        </div>
    );
};
