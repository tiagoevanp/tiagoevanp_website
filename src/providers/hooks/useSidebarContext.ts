'use client';

import { useContext } from 'react';

import { SidebarContext } from '../SidebarProvider';

export const useSidebarContext = () => {
    return useContext(SidebarContext);
};
