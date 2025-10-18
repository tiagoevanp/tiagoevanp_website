'use client';

import hljs from 'highlight.js';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useTranslation } from '@/i18n/client';
import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './layout.module.sass';

export default function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { t } = useTranslation();
    const path = usePathname();

    useEffect(() => {
        document.querySelectorAll('code').forEach((block) => {
            if (block && !block.hasAttribute('data-hljs-highlighted')) {
                hljs.highlightElement(block as HTMLElement);
                block.setAttribute('data-hljs-highlighted', 'true');
            }
        });
    }, [path]);

    return (
        <div className={styles.container}>
            <PageSidebar />
            <section className={styles.content}>
                {children}
            </section>
        </div>
    );
}
