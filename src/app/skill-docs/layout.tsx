import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './layout.module.sass';

export default function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <PageSidebar />
            <section className={styles.content}>
                {children}
            </section>
        </div>
    );
}
