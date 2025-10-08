import type { MDXComponents } from 'mdx/types';

import styles from './mdx-components.module.sass';

const components = {
    h1: ({ children }) => (
        <h1 className={styles.h1}>{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className={styles.h2}>{children}</h2>
    ),
    p: ({ children }) => (
        <p className={styles.p}>{children}</p>
    ),
    li: ({ children }) => (
        <li className={styles.li}>{children}</li>
    ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
    return components;
}
