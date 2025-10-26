import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './Banner.module.sass';

type BannerProps = {
    message: string;
    variant: 'warning' | 'success' | 'danger';
};

export const Banner = ({ message, variant }: BannerProps) => {
    return <div className={`${styles.banner} ${styles[variant]}`} role="banner">
        <p>{message}</p>
        <SvgIcon name='warning' variant='medium' />
    </div>;
};
