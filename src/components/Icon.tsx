import { css } from '@emotion/react';

type IconProps = {
    name: string;
    category?: 'solid' | 'regular' | 'brands';
    style?: React.CSSProperties;
};

export const Icon = ({ name, category = 'solid', style }: IconProps) => {
    const styles = {
        icon: css({
            fontSize: '64px',
            width: '64px',
            padding: 0,
            margin: 0,
            ...style,
        }),
    };
    return (
        <i css={styles.icon} className={`fa-${category} fa-${name} fa-fw`} aria-hidden="true"></i>
    );
};
