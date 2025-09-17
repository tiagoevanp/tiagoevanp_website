import { createContext } from 'react';

export type MenuContextType = {
    isOpened: boolean;
    openMenu: () => void;
    closeMenu: () => void;
};

export const MenuContext = createContext<MenuContextType | undefined>(undefined);
