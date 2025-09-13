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
    border: colors.eerieBlack,
    icon: colors.imperialRed,
    iconSecondary: colors.cornsilk,
    link: colors.cornsilk,
    linkSelected: colors.imperialRed,
    linkSelectedBackground: colors.cornsilk,
    paragraph: colors.seaSalt,
};

export const darkThemeColors = {
    background: colors.eerieBlack,
    backgroundContainer: colors.cornsilk,
    border: colors.dutchWhite,
    icon: colors.dutchWhite,
    iconSecondary: colors.imperialRed,
    link: colors.eerieBlack,
    linkSelected: colors.seaSalt,
    linkSelectedBackground: colors.eerieBlack,
    paragraph: colors.eerieBlack,
};

export type ThemeContextType = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    colors: typeof lightThemeColors | typeof darkThemeColors;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);