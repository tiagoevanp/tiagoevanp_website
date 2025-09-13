
import { type PropsWithChildren, useState } from 'react';

import { darkThemeColors, lightThemeColors, ThemeContext, type ThemeContextType } from '../contexts/ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<ThemeContextType['theme']>('light');

    const colors = theme === 'light' ? lightThemeColors : darkThemeColors;

    return (
        <ThemeContext.Provider value={{ theme, colors, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
