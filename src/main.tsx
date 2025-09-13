import './i18n';
import './main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from './providers/ThemeProvider';
import { router } from './routes';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
