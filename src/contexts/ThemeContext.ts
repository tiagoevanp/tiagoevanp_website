import { createContext } from 'react';

const palette = {
    imperialRed: '#E43636',
    indianRed: '#E35959',
    midnightGreen: '#114B5F',
    darkSlateGray: '#2F535E',
    gunmetal: '#1E2528',
    eerieBlack: '#1F1F1F',
    seaSalt: '#FAFAFA',
};

export const lightThemeColors = {
    page: {
        background: palette.seaSalt,
    },
    navbar: {
        background: palette.midnightGreen,
        link: {
            color: palette.seaSalt,
        },
    },
    text: {
        title: palette.imperialRed,
        paragraph: palette.eerieBlack,
    },
    icon: {
        fill: {
            primary: palette.seaSalt,
        },
    },
};

export const darkThemeColors = {
    page: {
        background: palette.gunmetal,
    },
    navbar: {
        background: palette.darkSlateGray,
        link: {
            color: palette.seaSalt,
        },
    },
    text: {
        title: palette.indianRed,
        paragraph: palette.seaSalt,
    },
    icon: {
        fill: {
            primary: palette.seaSalt,
            secondary: palette.seaSalt,
        },
    },
};

export const typography = {
    h1: {
        fontSize: '48px',
        lineHeight: '52.8px',
        fontWeight: 600,
    },
    h2: {
        fontSize: '32px',
        lineHeight: '35.2px',
        fontWeight: 500,
    },
    h3: {
        fontSize: '24px',
        lineHeight: '26.4px',
        fontWeight: 500,
    },
    h4: {
        fontSize: '20px',
        lineHeight: '22px',
        fontWeight: 500,
    },
    p: {
        fontSize: '16px',
        lineHeight: '17.6px',
        fontWeight: 400,
    },
    p2: {
        fontSize: '18px',
        lineHeight: '19.8px',
        fontWeight: 400,
    },
};

export const uiUtils = {
    shadow: '0 8px 16px 4px rgba(0, 0, 0, 50%)',
};

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    colors: typeof lightThemeColors | typeof darkThemeColors;
    typography: typeof typography;
    uiUtils: typeof uiUtils;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
