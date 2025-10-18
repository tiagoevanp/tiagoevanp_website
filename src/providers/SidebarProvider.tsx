'use client';

import { createContext, type PropsWithChildren, useState } from 'react';

import GroupsList from './lib/GroupsList';

export type GroupItem = {
    id: string;
    title: string;
    href: string;
};

export type SidebarGroup = {
    [key: string]: GroupItem[];
};

type SidebarContextType = {
    groups: SidebarGroup;
    filteredGroups: SidebarGroup;
    setFilteredGroups: (value: SidebarGroup) => void;
    next?: GroupItem;
    setNext: (value: GroupItem) => void
};

export const SidebarContext = createContext<SidebarContextType>({
    groups: {},
    filteredGroups: {},
    setFilteredGroups: () => null,
    next: undefined,
    setNext: () => null,
});

export function SidebarProvider({ children }: PropsWithChildren) {
    const [filteredGroups, setFilteredGroups] = useState(GroupsList.all);
    const [next, setNext] = useState<GroupItem>();

    return <SidebarContext.Provider
        value={{
            groups: GroupsList.all,
            filteredGroups,
            setFilteredGroups,
            next,
            setNext,
        }}
    >
        {children}
    </SidebarContext.Provider>;
}
