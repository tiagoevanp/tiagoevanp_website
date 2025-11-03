'use client';

import { useState } from 'react';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './Banner.module.sass';

type BannerProps = {
    message: string;
    variant: 'warning' | 'success' | 'danger';
};

export const Banner = ({ message, variant }: BannerProps) => {
    const [hidden, setHidden] = useState(false);

    return <div className={`${styles.banner} ${styles[variant]} ${hidden ? styles.hidden : ''}`} role="banner">
        <div className={styles.content}>
            <SvgIcon name='warning' variant='small' />
            <p>{message}</p>
        </div>
        <button className={styles.close} onClick={() => setHidden(true)}>X</button>
    </div>;
};
