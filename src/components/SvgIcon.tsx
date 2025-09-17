import { css } from '@emotion/react';

import { type NameProp } from './hooks/useDynamicSvgImport';

export type SvgIconProps = {
    name: NameProp;
};

export const SvgIcon = ({ name }: SvgIconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path css={css({ d: `var(--${name}-path)` })}/>
    </svg>;
};
