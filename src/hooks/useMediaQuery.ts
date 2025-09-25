import { useEffect, useState } from 'react';

const useMediaQueryMatch = (query: string) => {
    const [matches, setMatches] = useState<boolean | undefined>();

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        setMatches(mediaQueryList.matches);

        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', handler);

        return () => {
            mediaQueryList.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
};

export const useMediaQuery = () => {
    const isSmall = useMediaQueryMatch('(max-width: 480px)');
    const isMedium = useMediaQueryMatch('(max-width: 979px)');

    if (isSmall) {
        return 'small';
    }

    if (isMedium) {
        return 'medium';
    }

    return 'large';
};
