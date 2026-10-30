'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import { SearchInput } from '@/components/SearchInput/SearchInput';
import { useTranslation } from '@/i18n/client';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';

import styles from './PageSidebar.module.sass';

type PageSidebarProps = {
    // Called when an article is picked, e.g. to close the drawer on smaller screens
    onNavigate?: () => void;
};

export const PageSidebar = ({ onNavigate }: PageSidebarProps) => {
    const { groups } = useSidebarContext();
    const path = usePathname();
    const { t, i18n } = useTranslation();

    const skillsPath = '/skill-docs';

    return <nav aria-label={t('sidebar.aria_label')} className={styles.nav}>
        {/* <SearchInput /> */}
        <ul>
            {Object.keys(groups).map((name) => {
                if (groups[name].length > 0) {
                    return <li key={name} className={styles.group}>
                        <h2>{name}</h2>
                        <ul>
                            {groups[name].map(({ id, href, title }) => {
                                return (
                                    <li key={id} >
                                        <Link
                                            href={`${skillsPath}/${href}/${i18n.language}`}
                                            onClick={onNavigate}
                                            className={
                                                path.match(href) !== null
                                                    ? `${styles['link-active']} ${styles.link}`
                                                    : styles.link
                                            }
                                        >
                                            <p>{t(`sidebar.items.${title}`)}</p>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>;
                }
            })}
        </ul>
    </nav>;
};
