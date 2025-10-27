'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import useScreenSize from './hooks/useScreenSize';

type ScreenContextType = {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
};

export const ScreenContext = createContext<ScreenContextType>({
    isDesktop: false,
    isTablet: false,
    isMobile: false,
});

export function ScreenProvider({
    children,
}: PropsWithChildren) {
    const { width } = useScreenSize();
    const [value, setValue] = useState({ isDesktop: false, isTablet: false, isMobile: false });

    useEffect(() => {
        if (width < 768) {
            return setValue({
                isDesktop: false,
                isTablet: false,
                isMobile: true,
            });
        }

        if (width < 992) {
            return setValue({
                isDesktop: false,
                isTablet: true,
                isMobile: false,
            });
        }

        return setValue({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        });

    }, [width]);

    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
}
