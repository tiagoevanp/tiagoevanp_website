import './i18n';
import './main.css';
import './assets/icons/icons.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { MenuProvider } from './providers/MenuProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <MenuProvider>
                <RouterProvider router={router} />
            </MenuProvider>
        </ThemeProvider>
    </StrictMode>,
);
