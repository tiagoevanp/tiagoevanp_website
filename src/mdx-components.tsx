import type { MDXComponents } from 'mdx/types';

import { Image } from './components';
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
    a: ({ href, children }) => (
        <a
            className={styles.a}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
        >
            {children}
        </a>
    ),
    hr: () => (
        <hr className={styles.hr} />
    ),
    ul: ({ children }) => (
        <ul className={styles.ul}>{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className={styles.ol}>{children}</ol>
    ),
    li: ({ children }) => (
        <li className={styles.li}>{children}</li>
    ),
    blockquote: ({ children }) => (
        <div className={styles.blockquoteContainer}>
            <blockquote className={styles.blockquote}>{children}</blockquote>
        </div>
    ),
    img: ({ src, alt, title }) => (
        <Image
            src={src}
            alt={alt ?? title ?? 'Image'}
            placeholder={src}
            containerStyle={styles['img-container']}
            imageStyle={styles.img}
        />
    ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
    return components;
}
