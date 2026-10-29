import { Ref } from 'react';

import styles from './Button.module.sass';

type ButtonProps = {
    children: string;
    className?: string;
    'aria-label'?: string;
} & (
    | { onClick: () => void; href?: never; ref?: Ref<HTMLButtonElement> }
    // With href it renders an external link that opens in a new tab, except mailto: links
    | { href: string; onClick?: never; ref?: never }
);

export const Button = ({ ref, ...props }: ButtonProps) => {
    const className = props.className ? `${styles.button} ${props.className}` : styles.button;

    if (props.href !== undefined) {
        const newTab = !props.href.startsWith('mailto:');

        return (
            <a
                className={className}
                href={props.href}
                target={newTab ? '_blank' : undefined}
                rel={newTab ? 'noopener noreferrer' : undefined}
                aria-label={props['aria-label']}
            >
                {props.children}
            </a>
        );
    }

    return (
        <button
            ref={ref}
            className={className}
            onClick={props.onClick}
            aria-label={props['aria-label']}
        >
            {props.children}
        </button>
    );
};
