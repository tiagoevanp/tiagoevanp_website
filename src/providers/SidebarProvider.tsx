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
    // Whether the sidebar drawer is open on smaller screens
    isOpen: boolean;
    setOpen: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType>({
    groups: {},
    filteredGroups: {},
    setFilteredGroups: () => null,
    isOpen: false,
    setOpen: () => null,
});

export function SidebarProvider({ children }: PropsWithChildren) {
    const [filteredGroups, setFilteredGroups] = useState(GroupsList.all);
    const [isOpen, setOpen] = useState(false);

    return <SidebarContext.Provider
        value={{
            groups: GroupsList.all,
            filteredGroups,
            setFilteredGroups,
            isOpen,
            setOpen,
        }}
    >
        {children}
    </SidebarContext.Provider>;
}
