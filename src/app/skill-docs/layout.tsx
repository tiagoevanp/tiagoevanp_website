'use client';

import hljs from 'highlight.js';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { SvgIcon } from '@/components';
import { useTranslation } from '@/i18n/client';
import { useScreenContext } from '@/providers/hooks/useScreenContext';
import { PageSidebar } from '@/UI/PageSidebar/PageSidebar';

import styles from './layout.module.sass';

export default function SkillDocsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { t } = useTranslation();
    const path = usePathname();
    const { isDesktop } = useScreenContext();

    useEffect(() => {
        document.querySelectorAll('code').forEach((block) => {
            if (block && !block.hasAttribute('data-hljs-highlighted')) {
                hljs.highlightElement(block as HTMLElement);
                block.setAttribute('data-hljs-highlighted', 'true');
            }
        });
    }, [path]);

    return (
        isDesktop
            ? <div className={styles.container}><PageSidebar />
                <section className={styles.section}>
                    {children}
                </section>
            </div>

            : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SvgIcon name='person-digging' variant='large' />
                <p style={{ marginInline: '30px' }}>{t('skill_docs.mobile')}</p>
            </div>

    );
}
