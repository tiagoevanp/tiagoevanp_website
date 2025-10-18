'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SearchInput } from '@/components/SearchInput/SearchInput';
import { useTranslation } from '@/i18n/client';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';

import styles from './PageSidebar.module.sass';

export const PageSidebar = () => {
    const { filteredGroups } = useSidebarContext();
    const path = usePathname();
    const { t, i18n } = useTranslation();

    const skillsPath = '/skill-docs';

    return <nav aria-label={t('sidebar.aria_label')} className={styles.nav}>
        <SearchInput />
        <ul>
            {Object.keys(filteredGroups).map((name) => {
                if (filteredGroups[name].length > 0) {
                    return <div key={name}><li className={styles.group}><h2>{name}</h2></li> {
                        filteredGroups[name].map(({ id, href, title }) => {
                            return (
                                <li key={id} >
                                    <Link
                                        href={`${skillsPath}/${href}/${i18n.language}`}
                                        className={
                                            path.match(href) !== null
                                                ? `${styles['link-active']} ${styles.link}`
                                                : styles.link
                                        }
                                    >
                                        <p>{title}</p>
                                    </Link>
                                </li>
                            );
                        })
                    }</div>;
                }
            })}
        </ul>
    </nav>;
};
