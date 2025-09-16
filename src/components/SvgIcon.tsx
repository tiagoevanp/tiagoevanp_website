import { cloneElement } from 'react';

import useDynamicSVGImport, { type NameProp } from './hooks/useDynamicSvgImport';

export type SvgIconProps = {
    name: NameProp;
};

export const SvgIcon = ({ name }: SvgIconProps) => {
    const { error, loading, SvgIcon: LoadedIcon } = useDynamicSVGImport(name);

    if (error || loading) {
        // TODO: improve those boundaries
        return null;
    }

    if (LoadedIcon) {
        return cloneElement(LoadedIcon);
    }

    return null;
};
