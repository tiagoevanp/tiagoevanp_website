'use client';

import { useTranslation } from '@/i18n/client';

import styles from './ComparativeTableExample.module.sass';

export const ComparativeTableExample = () => {
    const { t } = useTranslation();

    return <table className={`${styles.tab} color-examples`}>
        <caption>
            {t('skill_docs.example_state_management.caption')}
        </caption>
        <thead>
            <tr>
                <th scope="col">
                    {t('skill_docs.example_state_management.characteristics')}
                </th>
                <th scope="col">
                    Redux
                </th>
                <th scope="col">
                    Context API
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">{t('skill_docs.example_state_management.complexity.title')}</th>
                <td>{t('skill_docs.example_state_management.complexity.redux')}</td>
                <td>{t('skill_docs.example_state_management.complexity.context_api')}</td>
            </tr>
            <tr>
                <th scope="row">{t('skill_docs.example_state_management.tooling.title')}</th>
                <td>{t('skill_docs.example_state_management.tooling.redux')}</td>
                <td>{t('skill_docs.example_state_management.tooling.context_api')}</td>
            </tr>
            <tr>
                <th scope="row">{t('skill_docs.example_state_management.performance.title')}</th>
                <td>{t('skill_docs.example_state_management.performance.redux')}</td>
                <td>{t('skill_docs.example_state_management.performance.context_api')}</td>
            </tr>
            <tr>
                <th scope="row">{t('skill_docs.example_state_management.use_cases.title')}</th>
                <td>{t('skill_docs.example_state_management.use_cases.redux')}</td>
                <td>{t('skill_docs.example_state_management.use_cases.context_api')}</td>
            </tr>
            <tr>
                <th scope="row">{t('skill_docs.example_state_management.learning_curve.title')}</th>
                <td>{t('skill_docs.example_state_management.learning_curve.redux')}</td>
                <td>{t('skill_docs.example_state_management.learning_curve.context_api')}</td>
            </tr>
        </tbody>
    </table>;
};

