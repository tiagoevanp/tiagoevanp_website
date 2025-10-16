'use client';

import 'highlight.js/styles/monokai-sublime.min.css';

import hljs from 'highlight.js';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './layout.module.sass';

export default function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname();

    useEffect(() => {
        hljs.highlightAll();
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
