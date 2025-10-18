'use client';

import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from '@/i18n/client';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import styles from './SearchInput.module.sass';

export const SearchInput = () => {
    const { t } = useTranslation();
    const { groups, setFilteredGroups } = useSidebarContext();
    const [filter, setFilter] = useState('');
    const [customClass, setCustomClass] = useState('');

    const onFocus = useCallback(() => {
        setCustomClass('focused');
    }, []);

    const onBlur = useCallback(() => {
        setCustomClass('');
    }, []);

    const onChange = useCallback((value: string) => {
        setFilter(value);
    }, []);

    useEffect(() => {
        const timeout = window.setTimeout(() => {

        }, 500);

        return () => window.clearTimeout(timeout);
    }, [filter, setFilteredGroups, groups]);

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
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
