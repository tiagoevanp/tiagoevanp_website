import jsxA11y from 'eslint-plugin-jsx-a11y';

const eslintConfig = {
    plugins: {
        'jsx-a11y': jsxA11y,
    },
    rules: {
        'jsx-a11y/anchor-ambiguous-text': 'error',
    },
};

export default eslintConfig;
