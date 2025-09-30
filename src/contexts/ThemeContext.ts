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
    home: {
        image: {
            primaryBackground: palette.amber,
            secondaryBackground: 'transparent',
        },
    },
    section: {
        text: {
            title: {
                color: palette.imperialRed,
            },
            color: palette.eerieBlack,
        },
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
    home: {
        image: {
            primaryBackground: palette.naplesYellow,
            secondaryBackground: 'transparent',
        },
    },
    section: {
        text: {
            title: {
                color: palette.indianRed,
            },
            color: palette.seaSalt,
        },
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
