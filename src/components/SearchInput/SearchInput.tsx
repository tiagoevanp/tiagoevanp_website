'use client';

import { useCallback, useState } from 'react';

import { useTranslation } from '@/i18n/client';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './SearchInput.module.sass';

export const SearchInput = () => {
    const { t } = useTranslation();
    const [customClass, setCustomClass] = useState('');

    const onFocus = useCallback(() => {
        setCustomClass('focused');
    }, []);

    const onBlur = useCallback(() => {
        setCustomClass('');
    }, []);

    return (
        <div className={`${styles.container} ${customClass}`} role='group'>
            <SvgIcon className={styles.icon} variant={'small'} name="magnifying-glass" aria-hidden='true' />
            <input
                name='search'
                className={styles.input}
                type='text'
                placeholder={t('sidebar.input.placeholder')}
                aria-invalid='false'
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    );
};
