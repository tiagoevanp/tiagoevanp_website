'use client';

import { Availability, Image, TextContainer } from '@/components';
import { useTranslation } from '@/i18n/client';

import styles from './page.module.sass';

export default function Home() {
    const { t } = useTranslation();

    return (
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
    );
}

