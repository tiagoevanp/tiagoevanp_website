'use client';

import { Banner, SkillDocCard } from '@/components';
import { useTranslation } from '@/i18n/client';
import GroupsList from '@/providers/lib/GroupsList';

import styles from './SkillDocsIndex.module.sass';

// Every doc, grouped and ordered as in the sidebar
export const SkillDocsIndex = () => {
    const { t } = useTranslation();

    return <>
        <h1 className={styles.title}>{t('skill_docs.index.title')}</h1>
        <p className={styles.description}>{t('skill_docs.index.description')}</p>
        <Banner message={t('page_under_construction')} variant='warning' />
        {Object.entries(GroupsList.all).map(([name, items], index) => (
            <section key={name} className={styles.group} aria-labelledby={`skill-docs-group-${index}`}>
                <h2 id={`skill-docs-group-${index}`} className={styles['group-title']}>{name}</h2>
                <ul className={styles.cards}>
                    {items.map((item) => <li key={item.id}><SkillDocCard item={item} /></li>)}
                </ul>
            </section>
        ))}
    </>;
};
