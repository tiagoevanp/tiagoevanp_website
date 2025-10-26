'use client';

import { useTranslation } from '@/i18n/client';

import styles from './AnimationsAndTransitionsExample.module.sass';

export const AnimationsAndTransitionsExample = () => {
    const { t } = useTranslation();

    return <div className={`color-examples ${styles.container}`}>
        <div className={styles['background-color-transition']}>
            {t('skill_docs.example_animation_transitions.hover_me')}
        </div>
        <div className={styles['transform-transition']}>
            {t('skill_docs.example_animation_transitions.hover_me')}
        </div>
        <div className={styles['opacity-transition']}>
            {t('skill_docs.example_animation_transitions.hover_me')}
        </div>
        <div className={styles['jump-animation']}>
            {t('skill_docs.example_animation_transitions.jumping')}
        </div>
    </div>;
};
