'use client';

import { createContext, type PropsWithChildren, useState } from 'react';

import GroupsList from './lib/GroupsList';

export type GroupItem = {
    id: string;
    title: string;
    href: string;
    sections: number;
    // Whether the article has an interactive example
    liveExample?: boolean;
};

export type SidebarGroup = {
    [key: string]: GroupItem[];
};

type SidebarContextType = {
    groups: SidebarGroup;
    // Whether the sidebar drawer is open on smaller screens
    isOpen: boolean;
    setOpen: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType>({
    groups: {},
    isOpen: false,
    setOpen: () => null,
});

export function SidebarProvider({ children }: PropsWithChildren) {
    const [isOpen, setOpen] = useState(false);

    return <SidebarContext.Provider
        value={{
            groups: GroupsList.all,
            isOpen,
            setOpen,
        }}
    >
        {children}
    </SidebarContext.Provider>;
}
