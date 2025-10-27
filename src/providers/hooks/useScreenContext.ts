'use client';

import { useContext } from 'react';

import { ScreenContext } from '../ScreenProvider';

export const useScreenContext = () => {
    return useContext(ScreenContext);
};
