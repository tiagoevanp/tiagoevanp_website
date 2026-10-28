'use client';

import { useState } from 'react';

import { useTranslation } from '@/i18n/client';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './Banner.module.sass';

type BannerProps = {
    message: string;
    variant: 'warning' | 'success' | 'danger';
};

export const Banner = ({ message, variant }: BannerProps) => {
    const { t } = useTranslation();
    const [hidden, setHidden] = useState(false);

    return <div className={`${styles.banner} ${styles[variant]} ${hidden ? styles.hidden : ''}`} role="status">
        <div className={styles.content}>
            <SvgIcon name='warning' variant='small' />
            <p>{message}</p>
        </div>
        <button className={styles.close} aria-label={t('banner.close')} onClick={() => setHidden(true)}>X</button>
    </div>;
};
