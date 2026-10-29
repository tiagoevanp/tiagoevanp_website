import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import jsxA11yRules from './eslint/jsx-a11y.mjs';
import simpleImport from './eslint/simple-import.mjs';
import stylisticRules from './eslint/stylistic.mjs';

const eslintConfig = [
    ...nextVitals,
    ...nextTs,
    { rules: jsxA11y.flatConfigs.recommended.rules },
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
