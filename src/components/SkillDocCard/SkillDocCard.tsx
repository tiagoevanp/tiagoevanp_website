'use client';

import Link from 'next/link';

import { useTranslation } from '@/i18n/client';
import { skillDocPath } from '@/lib/seo';
import type { GroupItem } from '@/providers/SidebarProvider';

import styles from './SkillDocCard.module.sass';

type SkillDocCardProps = {
    // Needs a summary under `skill_docs.summaries.<title>` in both locales
    item: GroupItem;
};

export const SkillDocCard = ({ item: { href, title, sections, liveExample } }: SkillDocCardProps) => {
    const { t, language } = useTranslation();

    return <Link className={styles.card} href={skillDocPath(href, language)}>
        <h3 className={styles['card-title']}>
            {t(`sidebar.items.${title}`)}
        </h3>
        <p className={styles['card-summary']}>
            {t(`skill_docs.summaries.${title}`)}
        </p>
        <p className={styles['card-meta']}>
            {t('skill_docs.sections', { count: sections })}
            {liveExample && <>
                <span aria-hidden='true'> · </span>
                {t('skill_docs.live_example')}
            </>}
        </p>
        <span className={styles['card-action']}>
            {t('skill_docs.read')}
            <span aria-hidden='true'> →</span>
        </span>
    </Link>;
};
