import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useMenu } from '../providers/hooks/useMenu';
import { useTheme } from '../providers/hooks/useTheme';
import { Backdrop } from './Backdrop';

export const Sidebar = () => {
    const { isOpened, closeMenu } = useMenu();
    const { colors, uiUtils } = useTheme();

    const styles = useMemo(() => ({
        sidebar: css({
            position: 'absolute',
            left: '16px',
            bottom: '16px',
            height: '128px',
            width: '128px',
            backgroundColor: colors.sidebar.background,
            borderRadius: '64px 0 64px 0',
            boxShadow: uiUtils.shadow,
            transition: 'width 0.2s linear, height 0.2s linear',

            '&.show': {
                height: '80vh',
                width: '60vw',
            },
        }),
    }), [colors.sidebar.background, uiUtils.shadow]);

    return (
        <>
            <Backdrop onClick={closeMenu}>
                <nav
                    className={`fade-background-transition ${isOpened ? 'show' : ''}`}
                    css={styles.sidebar}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                </nav>
            </Backdrop>

        </>
    );
};
