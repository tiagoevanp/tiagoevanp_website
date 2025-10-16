import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = {
    plugins: {
        'simple-import-sort': simpleImportSort,
    },
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
};

export default eslintConfig;
