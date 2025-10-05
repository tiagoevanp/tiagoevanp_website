'use client';

import { Image, TextContainer } from '@/components';
import { useTranslation } from '@/i18n/client';

import styles from './page.module.sass';

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Image
                containerStyle={styles['image-container']}
                imageStyle={styles.image}
                src='/tiago.jpg'
                alt={t('home.image_alt')}
            />
            <TextContainer
                title={t('home.title')}
                subtitle={t('home.subtitle')}
                paragraph={t('home.paragraph')}
            />
        </div>
    );
}

