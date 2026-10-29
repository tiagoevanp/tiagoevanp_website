'use client';

import { createContext, PropsWithChildren } from 'react';

import useScreenSize from './hooks/useScreenSize';

type ScreenContextType = {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
};

// Shared objects keep the context value stable while the breakpoint is unchanged
const unknownScreen = { isDesktop: false, isTablet: false, isMobile: false };
const mobileScreen = { isDesktop: false, isTablet: false, isMobile: true };
const tabletScreen = { isDesktop: false, isTablet: true, isMobile: false };
const desktopScreen = { isDesktop: true, isTablet: false, isMobile: false };

export const ScreenContext = createContext<ScreenContextType>(unknownScreen);

const getScreen = (width: number | undefined) => {
    // Undefined until hydrated, so the server and first client render match
    if (width === undefined) return unknownScreen;

    if (width < 768) return mobileScreen;

    if (width < 992) return tabletScreen;

    return desktopScreen;
};

export function ScreenProvider({
    children,
}: PropsWithChildren) {
    const value = getScreen(useScreenSize()?.width);

    return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
}
