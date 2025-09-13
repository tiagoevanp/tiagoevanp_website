import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import i18nextLoader from 'vite-plugin-i18next-loader';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        i18nextLoader({
            paths: ['./locales'],
            namespaceResolution: 'basename',
        }),
        react(
            {
                jsxImportSource: '@emotion/react',
                babel: {
                    plugins: ['@emotion/babel-plugin'],
                },
            },
        ),
    ],
});
