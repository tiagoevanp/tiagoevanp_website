'use client';

import { createContext, type PropsWithChildren } from 'react';

import { groups } from './lib/items';

type GroupItem = {
    id: string;
    title: string;
    href: string;
};

export type SidebarItem = {
    group: string;
    items: GroupItem[];
};

type SidebarContextType = {
    groups: SidebarItem[];
};

export const SidebarContext = createContext<SidebarContextType>({ groups });

export function SidebarProvider({ children }: PropsWithChildren) {
    return <SidebarContext.Provider value={{ groups }}>{children}</SidebarContext.Provider>;
}
