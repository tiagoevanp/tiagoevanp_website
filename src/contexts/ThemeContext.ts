import { createContext } from 'react';

const palette = {
    imperialRed: '#E43636',
    indianRed: '#E35959',
    midnightGreen: '#114B5F',
    darkSlateGray: '#2F535E',
    amber: '#F3B700',
    naplesYellow: '#F2CE61',
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
            hover: {
                color: palette.amber,
            },
            selected: {
                background: palette.amber,
                color: palette.midnightGreen,
            },
        },
    },
    text: {
        title: palette.imperialRed,
        paragraph: palette.eerieBlack,
    },
    icon: {
        fill: {
            color: palette.seaSalt,
            hover: palette.amber,
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
            hover: {
                color: palette.naplesYellow,
            },
            selected: {
                background: palette.naplesYellow,
                color: palette.darkSlateGray,
            },
        },
    },
    text: {
        title: palette.indianRed,
        paragraph: palette.seaSalt,
    },
    icon: {
        fill: {
            color: palette.seaSalt,
            hover: palette.naplesYellow,
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
    lightShadow: '0 8px 16px 4px rgba(0, 0, 0, 10%)',
};

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    colors: typeof lightThemeColors | typeof darkThemeColors;
    typography: typeof typography;
    uiUtils: typeof uiUtils;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
