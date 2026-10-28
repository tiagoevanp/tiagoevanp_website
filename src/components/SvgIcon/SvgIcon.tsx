'use client';

import { NameProp, svgPaths, viewBox } from './icons';
import styles from './SvgIcon.module.sass';

export type SvgIconProps = {
    name: NameProp;
    variant: 'small' | 'medium' | 'large';
    className?: string;
    // Without a label the icon is decorative and hidden from assistive technology
    label?: string;
};

export const SvgIcon = ({ name, variant, className, label }: SvgIconProps) => {
    return (
        <div
            className={`${styles[variant]} ${className}`}
            {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
        >
            <svg className={`${styles.icon}`} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBox[name].x} ${viewBox[name].y}`} focusable='false'>
                <path d={svgPaths[name]} />
            </svg>
        </div>
    );
};
