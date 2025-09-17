import { type PropsWithChildren, useState } from 'react';

import { MenuContext } from '../contexts/MenuContext';

const getMenuState = () => {
    return localStorage.getItem('menu-opened') === 'true' ? true : false ;
};

export const MenuProvider = ({ children }: PropsWithChildren) => {
    const [isOpened, toggleMenu] = useState(getMenuState());

    return (
        <MenuContext.Provider
            value={{
                isOpened,
                openMenu: () => { toggleMenu(true); localStorage.setItem('menu-opened', 'true'); },
                closeMenu: () => { toggleMenu(false); localStorage.setItem('menu-opened', 'false');},
            }}>
            {children}
        </MenuContext.Provider>
    );
};
