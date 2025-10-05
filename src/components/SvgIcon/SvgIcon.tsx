import { type NameProp } from '../hooks/useDynamicSvgImport';
import { svgPaths } from './icons';
import styles from './SvgIcon.module.sass';

export type SvgIconProps = {
    name: NameProp;
    variant: 'small' | 'medium' | 'large'
};

export const SvgIcon = ({ name, variant }: SvgIconProps) => {
    return <svg className={`${styles.icon} ${styles[variant]}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d={svgPaths[name]} />
    </svg>;
};
