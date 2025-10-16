import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import jsxA11yRules from './eslint/jsx-a11y.mjs';
import simpleImport from './eslint/simple-import.mjs';
import stylisticRules from './eslint/stylistic.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'),
    {
        ignores: [
            'node_modules/**',
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
        ],
    },
    {
        rules: {
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'eol-last': ['error'],
        },
    },
    simpleImport,
    stylisticRules,
    jsxA11yRules,
];

export default eslintConfig;
