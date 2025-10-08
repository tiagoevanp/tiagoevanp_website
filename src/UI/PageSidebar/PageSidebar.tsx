'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SearchInput } from '@/components/SearchInput/SearchInput';
import { useTranslation } from '@/i18n/client';
import { useSidebarItems } from '@/providers/hooks/useSidebarItems';

import styles from './PageSidebar.module.sass';

export const PageSidebar = () => {
    const groups = useSidebarItems();
    const path = usePathname();
    const { i18n } = useTranslation();

    const skillsPath = '/skill-docs';

    return <nav className={styles.nav}>
        <SearchInput />
        <ul>
            {groups.map(({ group, items }) => {
                return <div key={group}><li className={styles.group}><h2>{group}</h2></li> {
                    items.map(({ id, href, title }) => {
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
            })}
        </ul>
    </nav>;
};
