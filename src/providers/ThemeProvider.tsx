import { type PropsWithChildren, useState } from 'react';

import {
    darkThemeColors,
    lightThemeColors,
    ThemeContext,
    type ThemeContextType,
    typography,
    uiUtils,
} from '../contexts/ThemeContext';

const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme === 'dark' || localStorageTheme === 'light') {
        return localStorageTheme;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<ThemeContextType['theme']>(getDefaultTheme());

    const colors = theme === 'light' ? lightThemeColors : darkThemeColors;

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colors,
                typography,
                uiUtils,
                setTheme: (theme) => { setTheme(theme); localStorage.setItem('theme', theme); },
            }}>
            {children}
        </ThemeContext.Provider>
    );
};
