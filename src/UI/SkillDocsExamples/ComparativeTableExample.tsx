'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { useTranslation } from '@/i18n/client';

import styles from './ComparativeTableExample.module.sass';

export const ComparativeTableExample = () => {
    const { t } = useTranslation();
    const captionId = useId();
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [overflows, setOverflows] = useState(false);

    // On narrow screens the table can be wider than the column, so it scrolls in its own box instead of being cut
    // off. Like code blocks (SkillDocsLayout), the box only gets a Tab stop and a name while it actually scrolls
    useEffect(() => {
        const scroller = scrollerRef.current;
        let cancelled = false;

        if (!scroller) return;

        const update = () => {
            if (!cancelled) {
                setOverflows(scroller.scrollWidth > scroller.clientWidth);
            }
        };
        const observer = new ResizeObserver(update);

        observer.observe(scroller);
        // The web font can be wider than the fallback without changing the box's size
        document.fonts.ready.then(update);

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, []);

    // The caption sits outside the scroller, so it wraps and centres in the column instead of scrolling with the
    // table. A table caption would take the table's width and be cut off with it
    return <figure className={styles.figure}>
        <figcaption id={captionId} className={styles.caption}>
            {t('skill_docs.example_state_management.caption')}
        </figcaption>
        <div
            ref={scrollerRef}
            className={styles.scroller}
            tabIndex={overflows ? 0 : undefined}
            role={overflows ? 'group' : undefined}
            aria-labelledby={overflows ? captionId : undefined}
        >
            <table className={`${styles.tab} color-examples`} aria-labelledby={captionId}>
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
            </table>
        </div>
    </figure>;
};

