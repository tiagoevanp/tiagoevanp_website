import { createContext } from 'react';

import type { darkThemeColors } from './lib/darkScheme';
import type { lightThemeColors } from './lib/lightScheme';

export const typography = {
    h1: {
        fontSize: '48px',
        fontWeight: 400,
    },
    h2: {
        fontSize: '28px',
        fontWeight: 400,
    },
    p: {
        fontSize: '18px',
        lineHeight: '26px',
        fontWeight: 400,
    },
    p2: {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: 500,
    },
};

export const uiUtils = {
    shadow: '0 8px 16px 4px rgba(0, 0, 0, 50%)',
    lightShadow: '0 4px 8px 2px rgba(0, 0, 0, 25%)',
    zIndex: { first: 10 },
};

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    colors: typeof lightThemeColors | typeof darkThemeColors;
    typography: typeof typography;
    uiUtils: typeof uiUtils;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
