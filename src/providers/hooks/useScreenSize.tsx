'use client';

import { useSyncExternalStore } from 'react';

type ScreenSize = {
    width: number;
    height: number;
};

let screenSize: ScreenSize | undefined;

const subscribe = (onResize: () => void) => {
    window.addEventListener('resize', onResize);

    return () => {
        window.removeEventListener('resize', onResize);
    };
};

// Returns the same object while the size is unchanged, so it doesn't re-render on every read
const getSnapshot = () => {
    if (screenSize?.width !== window.innerWidth || screenSize.height !== window.innerHeight) {
        screenSize = { width: window.innerWidth, height: window.innerHeight };
    }

    return screenSize;
};

// Unknown on the server (static export); hydration uses this too, so the size is only read after it
const getServerSnapshot = () => undefined;

export const useScreenSize = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useScreenSize;
