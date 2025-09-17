import { css } from '@emotion/react';
import { type PropsWithChildren } from 'react';

import { useMenu } from '../providers/hooks/useMenu';

type BackdropProps = PropsWithChildren<{
    onClick: () => void
}>;

const time = '0.2s';

const styles = {
    backdrop: css({
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: '10',
        visibility: 'hidden',
        backdropFilter: 'blur(0)',
        transition: `
            backdrop-filter ${time} linear,
            background-color ${time} linear,
            filter ${time} linear,
            visibility 0s linear ${time}
        `,

        '&.show': {
            backgroundColor: 'rgba(0, 0, 0, 40%)',
            visibility: 'visible',
            backdropFilter: 'blur(16px)',
            filter: 'opacity(1)',
            transition: `
                backdrop-filter ${time} linear,
                background-color ${time} linear,
                filter ${time} linear,
                visibility 0s linear 0s
            `,
        },
    }),
};

export const Backdrop = ({ children, onClick }: BackdropProps) => {
    const { isOpened } = useMenu();

    return <div className={`${isOpened ? 'show' : ''}`} css={styles.backdrop} onClick={onClick}>{children}</div>;
};
