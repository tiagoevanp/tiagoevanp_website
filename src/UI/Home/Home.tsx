'use client';

import Link from 'next/link';

import { Availability, Image, SkillDocCard, Tag, TextContainer } from '@/components';
import { useTranslation } from '@/i18n/client';
import { featuredSkillDocs, stack } from '@/lib/home';
import { experiencePath, skillDocsIndexPath } from '@/lib/seo';
import type { SkillDocSections } from '@/lib/skillDocSections';

import styles from './Home.module.sass';

export const Home = ({ sections }: { sections: SkillDocSections }) => {
    const { t, language } = useTranslation();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <TextContainer
                    title={t('home.title')}
                    subtitle={t('home.roles', { returnObjects: true }) as string[]}
                    aside={<Availability />}
                    paragraph={t('home.paragraph')}
                    actions={
                        <Link className={styles['experience-link']} href={experiencePath(language)}>
                            {t('home.cta_experience')}
                            <span aria-hidden='true'> →</span>
                        </Link>
                    }
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
                        {featuredSkillDocs.map((item) => <li key={item.id}>
                            <SkillDocCard item={item} sections={sections[item.href]} />
                        </li>)}
                    </ul>
                    <Link className={styles['see-all']} href={skillDocsIndexPath(language)}>
                        {t('home.skill_docs_see_all')}
                        <span aria-hidden='true'> →</span>
                    </Link>
                </section>
            </div>
        </div>
    );
};
