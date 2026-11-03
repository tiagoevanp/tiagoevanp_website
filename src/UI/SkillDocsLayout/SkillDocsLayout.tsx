'use client';

import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import { SvgIcon } from '@/components';
import { getSkillDocSlug, useTranslation } from '@/i18n/client';
import { useSidebarContext } from '@/providers/hooks/useSidebarContext';
import GroupsList from '@/providers/lib/GroupsList';
import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './SkillDocsLayout.module.sass';

const sidebarId = 'skill-docs-sidebar';
const toggleLabelId = 'skill-docs-toggle-label';
const toggleCurrentId = 'skill-docs-toggle-current';

// Only the languages the articles use, so the rest of highlight.js stays out of the bundle. xml covers html
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('xml', xml);
// highlight.js has no grammar for the indented syntax; the SCSS one covers its variables, selectors and at-rules
hljs.registerAliases('sass', { languageName: 'scss' });

export function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { t } = useTranslation();
    const path = usePathname();
    const slug = getSkillDocSlug(path);
    const current = slug ? GroupsList.getItem(slug) : undefined;
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
        // Inline code keeps the site's chip style, so only blocks are highlighted
        document.querySelectorAll<HTMLElement>('pre > code').forEach((block) => {
            if (!block.hasAttribute('data-hljs-highlighted')) {
                hljs.highlightElement(block);
                block.setAttribute('data-hljs-highlighted', 'true');
            }
        });

        // Blocks that scroll sideways need a Tab stop so keyboard users can scroll them (Safari
        // doesn't make scroll areas focusable on its own). Blocks that fit get none. The pre is
        // what scrolls (see globals.sass), so it gets the Tab stop.
        const blocks = Array.from(
            document.querySelectorAll('pre > code'),
            (code) => code.parentElement as HTMLElement,
        );

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

        // The drawer is last in the DOM, so Tab from its last link leaves the page and the blur has no
        // relatedTarget. Close it once focus comes back anywhere else, so it never covers the focused element.
        // Focus on an element around the drawer (main#content, after a click on a label or the padding) stays open
        const handleFocusIn = (event: FocusEvent) => {
            const target = event.target as Node;

            if (
                !sidebarRef.current?.contains(target)
                && !toggleRef.current?.contains(target)
                && !target.contains(sidebarRef.current)
            ) {
                closeSidebar(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('focusin', handleFocusIn);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('focusin', handleFocusIn);
        };
    }, [isOpen, closeSidebar]);

    // The index lists every doc itself, so it gets the full width without the sidebar or the phone toolbar
    if (!slug) return children;

    // The article comes first, so the skip link lands in it instead of in front of the topic list;
    // the grid puts the sidebar back on the left
    return <div className={styles.container}>
        <section className={styles.section}>
            {children}
        </section>
        <div className={styles.toolbar}>
            {/* Named "Topics" by its visible label; the open article is its description, so the two aren't
                read run together as one name */}
            <button
                ref={toggleRef}
                type='button'
                className={styles.toggle}
                aria-labelledby={toggleLabelId}
                aria-describedby={current ? toggleCurrentId : undefined}
                aria-expanded={isOpen}
                aria-controls={sidebarId}
                onClick={() => setOpen(!isOpen)}
            >
                <SvgIcon name='bars' variant='small' className={styles['toggle-icon']} />
                <span id={toggleLabelId} className={styles['toggle-label']}>{t('sidebar.toggle')}</span>
                {current && <span className={styles['toggle-current']}>
                    <span aria-hidden='true'> · </span>
                    <span id={toggleCurrentId}>{t(`sidebar.items.${current.title}`)}</span>
                </span>}
            </button>
        </div>
        <div
            ref={sidebarRef}
            id={sidebarId}
            className={isOpen ? `${styles.sidebar} ${styles['sidebar-open']}` : styles.sidebar}
            onBlur={(event) => {
                const next = event.relatedTarget;

                // Close when keyboard focus leaves the drawer, but not when it goes back to the toggle, or to an
                // element around the drawer after a click on a part of it that can't take focus
                if (
                    isOpen
                    && next
                    && !event.currentTarget.contains(next)
                    && next !== toggleRef.current
                    && !next.contains(event.currentTarget)
                ) {
                    closeSidebar(false);
                }
            }}
        >
            <PageSidebar onNavigate={() => closeSidebar(true)} />
        </div>
    </div>;
}
