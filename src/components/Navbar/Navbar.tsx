import { css } from '@emotion/react';
import type { PropsWithChildren } from 'react';

import { useTheme } from '../../providers/hooks/useTheme';

type NavbarProps = PropsWithChildren;

export const Navbar = ({ children }: NavbarProps) => {
    const { colors, uiUtils } = useTheme();

    const styles = {
        container: css({
            display: 'flex',
            width: '100%',
            minHeight: '96px',
            background: colors.navbar.background,
            boxShadow: uiUtils.shadow,
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
        }),
    };
    return <nav css={styles.container} className='fade-colors-transition'>
        {children}
    </nav>;
};
