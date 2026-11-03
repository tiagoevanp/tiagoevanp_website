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

const skillsPath = '/skill-docs';
// The overview is a single page for both languages for now
const indexPath = skillsPath;

export const PageSidebar = ({ onNavigate }: PageSidebarProps) => {
    const { groups } = useSidebarContext();
    const path = usePathname();
    const { t, language } = useTranslation();

    const isIndexPage = path.replace(/\/$/, '') === indexPath;

    return <nav aria-label={t('sidebar.aria_label')} className={styles.nav}>
        {/* <SearchInput /> */}
        <Link
            href={indexPath}
            onClick={onNavigate}
            className={styles.link}
            aria-current={isIndexPage ? 'page' : undefined}
        >
            {t('sidebar.index')}
        </Link>
        <ul>
            {Object.keys(groups).map((name, index) => {
                if (groups[name].length > 0) {
                    // A label, not a heading, so the sidebar adds nothing to the page's heading list
                    return <li key={name} className={styles.group}>
                        <p id={`sidebar-group-${index}`} className={styles['group-label']}>{name}</p>
                        <ul aria-labelledby={`sidebar-group-${index}`}>
                            {groups[name].map(({ id, href, title }) => {
                                return (
                                    <li key={id} >
                                        <Link
                                            href={`${skillsPath}/${href}/${language}`}
                                            onClick={onNavigate}
                                            className={styles.link}
                                            aria-current={path.match(href) !== null ? 'page' : undefined}
                                        >
                                            {t(`sidebar.items.${title}`)}
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
