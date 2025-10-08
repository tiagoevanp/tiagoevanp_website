'use client';

import { useContext } from 'react';

import { SidebarContext } from '../SidebarProvider';

export const useSidebarItems = () => {
    const context = useContext(SidebarContext);

    return context.groups;
};
