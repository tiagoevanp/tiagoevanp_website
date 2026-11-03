'use client';

import Link from 'next/link';
import { Fragment } from 'react';

import { useTranslation } from '@/i18n/client';
import { skillDocPath } from '@/lib/seo';
import type { GroupItem } from '@/providers/SidebarProvider';

import styles from './SkillDocCard.module.sass';

type SkillDocCardProps = {
    // Needs a summary under `skill_docs.summaries.<title>` in both locales
    item: GroupItem;
    // The article's h2s, from getSkillDocSections (server only); not shown when there are none
    sections: number;
};

export const SkillDocCard = ({ item: { href, title, liveExample }, sections }: SkillDocCardProps) => {
    const { t, language } = useTranslation();
    const meta = [
        sections > 0 && t('skill_docs.sections', { count: sections }),
        liveExample && t('skill_docs.live_example'),
    ].filter((text): text is string => Boolean(text));

    return <Link className={styles.card} href={skillDocPath(href, language)}>
        <h3 className={styles['card-title']}>
            {t(`sidebar.items.${title}`)}
        </h3>
        <p className={styles['card-summary']}>
            {t(`skill_docs.summaries.${title}`)}
        </p>
        {meta.length > 0 && <p className={styles['card-meta']}>
            {meta.map((text, index) => <Fragment key={text}>
                {index > 0 && <span aria-hidden='true'> · </span>}
                {text}
            </Fragment>)}
        </p>}
        <span className={styles['card-action']}>
            {t('skill_docs.read')}
            <span aria-hidden='true'> →</span>
        </span>
    </Link>;
};
