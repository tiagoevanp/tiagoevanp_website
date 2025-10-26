import { useTranslation } from '@/i18n/client';

import styles from './Tag.module.sass';

type TagProps = {
    children: string;
};

export const Tag = ({ children }: TagProps) => {
    const { t } = useTranslation();

    return <span className={styles.tag}>{t(children)}</span>;
};
