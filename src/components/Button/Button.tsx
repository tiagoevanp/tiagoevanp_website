import { Ref } from 'react';

import styles from './Button.module.sass';

type ButtonProps = {
    children: string;
    className?: string;
    'aria-label'?: string;
} & (
    | { onClick: () => void; href?: never; ref?: Ref<HTMLButtonElement> }
    // With href it renders an external link that opens in a new tab
    | { href: string; onClick?: never; ref?: never }
);

export const Button = ({ ref, ...props }: ButtonProps) => {
    const className = props.className ? `${styles.button} ${props.className}` : styles.button;

    if (props.href !== undefined) {
        return (
            <a
                className={className}
                href={props.href}
                target='_blank'
                rel='noopener noreferrer'
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
