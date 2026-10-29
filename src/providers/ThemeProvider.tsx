'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ComponentProps } from 'react';

// React 19 warns when a client component renders an executable <script>.
// The theme script only needs to run from the server HTML, so on the client
// mark it as non-executable to silence the warning.
const scriptProps =
    typeof window === 'undefined'
        ? undefined
        : ({ type: 'application/json' } as const);

export function ThemeProvider({
    children,
    ...props
}: ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider scriptProps={scriptProps} {...props}>
            {children}
        </NextThemesProvider>
    );
}
