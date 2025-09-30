import { css } from '@emotion/react';
import { type PropsWithChildren, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router';

import { useTheme } from '../../providers/hooks/useTheme';

type NavbarLinkProps = PropsWithChildren<{
    to: string
}>;

export const NavbarLink = ({ children, to }: NavbarLinkProps) => {
    const { pathname } = useLocation();
    const { colors, typography, uiUtils: { lightShadow } } = useTheme();
    const styles = useMemo(() => ({
        navLink: css({
            position: 'relative',
            padding: '8px',
            backgroundColor: pathname === to ? colors.navbar.link.selected.background : '',
            color: pathname === to ? colors.navbar.link.selected.color : colors.navbar.link.color,
            textDecoration: 'none',
            ...typography.p,

            ...(pathname === to) && {
                boxShadow: lightShadow,
            },

            ...(pathname !== to) && {
                '&:hover': {
                    color: colors.navbar.link.hover.color,
                },
            },

            '&::after': {
                content:  '\'\'',
                position: 'absolute',
                margin: 'auto',
                left: 0,
                bottom: '-8px',
                width: '100%',
                height: '2px',
                backgroundColor: colors.navbar.link.color,
                transform: 'scale(0)',
                transformOrigin: 'center',
                transition: 'transform 0.2s ease-out',
            },

            '&:hover::after': {
                transform: 'scale(1)',
                backgroundColor: colors.navbar.link.hover.color,
            },
        }),
    }), [
        colors.navbar.link.color,
        colors.navbar.link.hover.color,
        colors.navbar.link.selected.background,
        colors.navbar.link.selected.color,
        lightShadow,
        pathname,
        to,
        typography.p,
    ]);

    return <NavLink className='fade-colors-transition' css={styles.navLink} to={to}>
        {children}
    </NavLink>;
};
