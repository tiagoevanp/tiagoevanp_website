
import { type PropsWithChildren, useState } from 'react';

import { darkThemeColors, lightThemeColors, ThemeContext, type ThemeContextType, typography, uiUtils } from '../contexts/ThemeContext';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<ThemeContextType['theme']>('light');

    const colors = theme === 'light' ? lightThemeColors : darkThemeColors;

    return (
        <ThemeContext.Provider value={{ theme, colors, typography, uiUtils, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
