import { createContext } from 'react';

const colors = {
    imperialRed: '#E43636',
    cornsilk: '#F6EFD2',
    dutchWhite: '#E2DDB4',
    eerieBlack: '#1F1F1F',
    davisGrey: '#555555',
    seaSalt: '#FAFAFA',
};

export const lightThemeColors = {
    background: colors.cornsilk,
    backgroundContainer: colors.imperialRed,
    backroundButton: colors.imperialRed,
    border: colors.eerieBlack,
    icon: colors.imperialRed,
    iconSecondary: colors.cornsilk,
    link: colors.cornsilk,
    linkSelected: colors.imperialRed,
    linkSelectedBackground: colors.cornsilk,
    title: colors.imperialRed,
    paragraph: colors.seaSalt,
};

export const darkThemeColors = {
    background: colors.eerieBlack,
    backgroundContainer: colors.cornsilk,
    backroundButton: colors.cornsilk,
    border: colors.dutchWhite,
    icon: colors.dutchWhite,
    iconSecondary: colors.imperialRed,
    link: colors.eerieBlack,
    linkSelected: colors.seaSalt,
    linkSelectedBackground: colors.eerieBlack,
    title: colors.dutchWhite,
    paragraph: colors.eerieBlack,
};

export const typography = {
    h1: {
        fontSize: '64px',
        lineHeight: '64px',
        fontWeight: 600,
    },
    p: {
        fontSize: '16px',
        lineHeight: '19.2px',
        fontWeight: 400,
    },
};

export const uiUtils = {
    shadow: `0 8px 16px 4px ${colors.eerieBlack}`,
};

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    colors: typeof lightThemeColors | typeof darkThemeColors;
    typography: typeof typography;
    uiUtils: typeof uiUtils;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);