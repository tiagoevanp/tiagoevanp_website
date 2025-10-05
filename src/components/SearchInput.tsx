import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../providers/hooks/useTheme';
import { SvgIcon } from './SvgIcon/SvgIcon';

export const SearchInput = () => {
    const { t } = useTranslation();
    const { colors, typography } = useTheme();
    const [customClass, setCustomClass] = useState('');

    const styles = {
        wrapper: css({
            display: 'flex',
            alignItems: 'center',
            margin: '32px',
            paddingInline: '16px',
            height: '48px',
            border: `solid 2px ${colors.input.border}`,
            borderRadius: '2px',
        }),
        icon: {
            width: '32px',
            height: '32px',
            paddingInlineEnd: '16px',

            '& path': {
                fill: colors.input.icon,
            },
        },
        input: css({
            backgroundColor: 'transparent',
            border: 'none',
            width: '100%',
            height: '95%',
            color: colors.input.value,
            ...typography.p,

            '&::placeholder': {
                color: colors.input.placeholder,
            },

            '&:focus': {
                outline: 0,
            },
        }),
    };

    const onFocus = useCallback(() => {
        setCustomClass('focused');
    }, []);

    const onBlur = useCallback(() => {
        setCustomClass('');
    }, []);

    return <div css={styles.wrapper} className={customClass} role='group'>
        <SvgIcon style={styles.icon} name="magnifying-glass" aria-hidden='true'/>
        <input
            name='search'
            css={styles.input}
            type='text'
            placeholder={t('sidebar.input.placeholder')}
            aria-invalid='false'
            onFocus={onFocus}
            onBlur={onBlur}
        />
    </div>;
};
