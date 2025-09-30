import { css } from '@emotion/react';
import { useMemo } from 'react';

import { useTheme } from '../../providers/hooks/useTheme';

export const Sidebar = () => {
    const { colors } = useTheme();

    const styles = useMemo(() => ({
        navbar: css({
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.sidebar?.background || 'white',
        }),
    }), [colors.sidebar?.background]);

    return <nav css={styles.navbar}>
        BRAH!
    </nav>;
};
