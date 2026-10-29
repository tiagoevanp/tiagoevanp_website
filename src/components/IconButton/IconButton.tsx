import { Ref } from 'react';

import { NameProp } from '../SvgIcon/icons';
import { SvgIcon, type SvgIconProps } from '../SvgIcon/SvgIcon';
import styles from './IconButton.module.sass';

type IconButtonProps = Omit<SvgIconProps, 'name' | 'variant' | 'label'> & {
    icon: NameProp;
    description: string;
    variant: 'small' | 'medium' | 'large';
    className?: string;
    style?: React.CSSProperties;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
    'aria-pressed'?: boolean;
} & (
    | { onClick: () => void; href?: never; ref?: Ref<HTMLButtonElement> }
    // With href it renders an external link that opens in a new tab
    | { href: string; onClick?: never; ref?: never }
);

export const IconButton = ({ ref, ...props }: IconButtonProps) => {
    const baseClassName = `fade-colors-transition ${styles.button} ${styles[props.variant]}`;
    const className = props.className ? `${baseClassName} ${props.className}` : baseClassName;
    const content = <SvgIcon
        name={props.icon}
        variant={props.variant}
    />;

    if (props.href !== undefined) {
        return (
            <a
                className={className}
                href={props.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={props.description}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            ref={ref}
            className={className}
            onClick={props.onClick}
            aria-expanded={props['aria-expanded']}
            aria-controls={props['aria-controls']}
            aria-pressed={props['aria-pressed']}
            aria-label={props.description}
        >
            {content}
        </button>
    );
};
