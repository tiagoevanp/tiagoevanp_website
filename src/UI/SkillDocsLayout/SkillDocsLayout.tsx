'use client';

import hljs from 'highlight.js';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import { IconButton } from '@/components';
import { useTranslation } from '@/i18n/client';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';
import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './SkillDocsLayout.module.sass';

const sidebarId = 'skill-docs-sidebar';

export function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { t } = useTranslation();
    const path = usePathname();
    const { isOpen, setOpen } = useSidebarContext();
    const toggleRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const closeSidebar = useCallback((restoreFocus: boolean) => {
        setOpen(false);

        if (restoreFocus) {
            toggleRef.current?.focus();
        }
    }, [setOpen]);

    useEffect(() => {
        document.querySelectorAll('code').forEach((block) => {
            if (block && !block.hasAttribute('data-hljs-highlighted')) {
                hljs.highlightElement(block as HTMLElement);
                block.setAttribute('data-hljs-highlighted', 'true');
            }
        });

        // Blocks that scroll sideways need a Tab stop so keyboard users can scroll them (Safari
        // doesn't make scroll areas focusable on its own). Blocks that fit get none.
        const blocks = Array.from(document.querySelectorAll<HTMLElement>('pre > code'));

        const updateFocusable = (block: HTMLElement) => {
            if (block.scrollWidth > block.clientWidth) {
                block.setAttribute('tabindex', '0');
                // The code role can't be named, so the block is labelled as a group
                block.setAttribute('role', 'group');
                block.setAttribute('aria-label', t('skill_docs.code_example'));
            } else {
                block.removeAttribute('tabindex');
                block.removeAttribute('role');
                block.removeAttribute('aria-label');
            }
        };

        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => updateFocusable(entry.target as HTMLElement));
        });

        blocks.forEach((block) => observer.observe(block));
        // The web font can be wider than the fallback without changing the block's size
        document.fonts.ready.then(() => blocks.forEach(updateFocusable));

        return () => observer.disconnect();
    }, [path, t]);

    // The drawer only exists on smaller screens (see SkillDocsLayout.module.sass), so this only runs there
    useEffect(() => {
        if (!isOpen) return;

        sidebarRef.current?.querySelector('a')?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeSidebar(true);
            }
        };

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (!sidebarRef.current?.contains(target) && !toggleRef.current?.contains(target)) {
                closeSidebar(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [isOpen, closeSidebar]);

    return <div className={styles.container}>
        <div className={styles.toolbar}>
            <IconButton
                ref={toggleRef}
                icon='bars'
                description={t('sidebar.toggle')}
                variant='medium'
                aria-expanded={isOpen}
                aria-controls={sidebarId}
                onClick={() => setOpen(!isOpen)}
            />
        </div>
        <div
            ref={sidebarRef}
            id={sidebarId}
            className={isOpen ? `${styles.sidebar} ${styles['sidebar-open']}` : styles.sidebar}
            onBlur={(event) => {
                const next = event.relatedTarget;

                // Close when keyboard focus leaves the drawer, but not when it goes back to the toggle
                if (isOpen && next && !event.currentTarget.contains(next) && next !== toggleRef.current) {
                    closeSidebar(false);
                }
            }}
        >
            <PageSidebar onNavigate={() => closeSidebar(true)} />
        </div>
        <section className={styles.section}>
            {children}
        </section>
    </div>;
}
