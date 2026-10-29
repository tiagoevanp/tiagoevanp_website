'use client';

import Link from 'next/link';

import { Availability, Image, Tag, TextContainer } from '@/components';
import { useTranslation } from '@/i18n/client';
import { featuredSkillDocs, getAllSkillDocsPath, stack } from '@/lib/home';

import styles from './page.module.sass';

export default function Home() {
    const { t, i18n: { language } } = useTranslation();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <TextContainer
                    title={t('home.title')}
                    subtitle={t('home.roles', { returnObjects: true }) as string[]}
                    aside={<Availability />}
                    paragraph={t('home.paragraph')}
                />
                <Image
                    containerStyle={styles['image-container']}
                    imageStyle={styles.image}
                    src='/tiago.jpg'
                    placeholder='/tiago_placeholder.jpg'
                    alt={t('home.image_alt')}
                    preload
                />
            </div>
            <div className={styles.highlights}>
                <section aria-labelledby='stack-title'>
                    <h2 id='stack-title' className={styles['section-title']}>
                        {t('home.stack_title')}
                    </h2>
                    <ul className={styles.stack}>
                        {stack.map((tech) => <li key={tech}><Tag>{tech}</Tag></li>)}
                    </ul>
                </section>
                <section aria-labelledby='skill-docs-title'>
                    <h2 id='skill-docs-title' className={styles['section-title']}>
                        {t('home.skill_docs_title')}
                    </h2>
                    <ul className={styles.cards}>
                        {featuredSkillDocs.map(({ id, href, title }) => (
                            <li key={id}>
                                <Link className={styles.card} href={`/skill-docs/${href}/${language}`}>
                                    <h3 className={styles['card-title']}>
                                        {t(`sidebar.items.${title}`)}
                                    </h3>
                                    <p className={styles['card-summary']}>
                                        {t(`home.skill_docs_summaries.${title}`)}
                                    </p>
                                    <span className={styles['card-action']}>
                                        {t('home.skill_docs_read')}
                                        <span aria-hidden='true'> →</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link className={styles['see-all']} href={getAllSkillDocsPath(language)}>
                        {t('home.skill_docs_see_all')}
                        <span aria-hidden='true'> →</span>
                    </Link>
                </section>
            </div>
        </div>
    );
}
