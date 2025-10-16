import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = {
    plugins: {
        '@stylistic': stylistic,
    },
    rules: {
        '@stylistic/max-len': ['error', { 'code': 120, 'ignoreUrls': true }],
        '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
        '@stylistic/no-multi-spaces': ['error', { 'includeTabs': true }],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/no-whitespace-before-property': 'error',
        '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 1 }],
        '@stylistic/indent': ['error', 4],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
};

export default eslintConfig;
