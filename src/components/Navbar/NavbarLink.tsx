import { css } from '@emotion/react';
import { type PropsWithChildren, useMemo } from 'react';
import { NavLink } from 'react-router';

import { useTheme } from '../../providers/hooks/useTheme';

type NavbarLinkProps = PropsWithChildren<{
    to: string
}>;

export const NavbarLink = ({ children, to }: NavbarLinkProps) => {
    const { colors, typography } = useTheme();
    const styles = useMemo(() => ({
        navLink: css({
            color: colors.navbar.link.color,
            textDecoration: 'none',
            ...typography.p2,
        }),
    }), [colors.navbar.link.color, typography.p2]);

    return <NavLink css={styles.navLink} to={to}>
        {children}
    </NavLink>;
};
