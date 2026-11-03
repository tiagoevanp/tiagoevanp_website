import type { MDXComponents } from 'mdx/types';

import { ArticleLink, Image, SectionHeading } from './components';
import styles from './mdx-components.module.sass';

const components = {
    h1: ({ children }) => (
        <h1 className={styles.h1}>{children}</h1>
    ),
    h2: ({ id, children }) => (
        <SectionHeading id={id} className={styles.h2} containerClassName={styles['h2-container']}>
            {children}
        </SectionHeading>
    ),
    p: ({ children }) => (
        <p className={styles.p}>{children}</p>
    ),
    a: ({ href, children }) => (
        <ArticleLink className={styles.a} href={href}>{children}</ArticleLink>
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
        <div className={styles['blockquote-container']}>
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
