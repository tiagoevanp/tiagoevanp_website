import { useCallback } from 'react';

import { TextContainer } from '../components';
import { useTheme } from '../providers/hooks/useTheme';

export const Home = () => {
    const { theme, setTheme, colors } = useTheme();

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }, [setTheme, theme]);

    const style = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: colors.background,
        },
    };

    return (
        <div css={style.container}>
            <button type='button' onClick={toggleTheme}>Click me</button>
            <TextContainer />
        </div>
    );
};
