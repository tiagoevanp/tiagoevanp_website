import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Tiago from '../assets/images/tiago.jpg'; // cSpell:words tiago
import { Image, TextContainer } from '../components';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Home = () => {
    const { t } = useTranslation();
    const size = useMediaQuery();

    const styles = useMemo(
        () => ({
            content: css({
                flex: 1,
                display: 'flex',
                flexDirection: size === 'large' ? 'row' : 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '100%',
                margin: size ==='large' ? '128px' : '64px',
                gap: size === 'large' ? '128px' : '64px',
            }),
        }),
        [size],
    );

    return (
        <div css={styles.content}>
            <Image
                containerStyle={{
                    flex: '1 1 auto',
                    minWidth: '256px',
                    maxWidth: '512px',
                    rotate: '5deg',
                    padding: '8px',
                }}
                imageStyle={{
                    rotate: '-10deg',
                }}
                src={Tiago}
                alt={t('tiago_photo')}
            />
            <TextContainer
                title={t('home.title')}
                subtitle={t('home.subtitle')}
                paragraph={t('home.paragraph')}
            />
        </div>
    );
};
