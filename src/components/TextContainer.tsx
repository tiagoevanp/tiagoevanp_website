import { css } from '@emotion/react';

import { useTheme } from '../providers/hooks/useTheme';

export const TextContainer = () => {
    const { colors } = useTheme();
    const styles = {
        container: css({
            width: '1100px',
            height: '450px',
            margin: '10px',
            border: `16px solid ${colors.border}`,
            backgroundColor: colors.backgroundContainer,
            borderRadius: '256px 0 256px 0',
        }),
    };
    
    return (
        <div css={styles.container}></div>
    );
};
