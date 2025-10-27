'use client';

import { useEffect, useState } from 'react';

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return screenSize;
};

export default useScreenSize;
