import { NameProp } from '../SvgIcon/icons';
import { SvgIcon, type SvgIconProps } from '../SvgIcon/SvgIcon';
import styles from './Button.module.sass';

type DefaultButtonProps = {
    variant: 'small' | 'medium' | 'large';
    className?: string;
    style?: React.CSSProperties;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
} & (
    | { onClick: () => void; href?: never }
    // With href it renders an external link that opens in a new tab
    | { href: string; onClick?: never }
);

type IconButtonProps = DefaultButtonProps & Omit<SvgIconProps, 'name' | 'variant' | 'label'> & {
    icon: NameProp;
    description: string;
};

type TextButtonProps = DefaultButtonProps & {
    text: string;
};

const isIconButton = (props: ButtonProps): props is IconButtonProps => {
    return (props as IconButtonProps).icon !== undefined;
};

type ButtonProps = (IconButtonProps | TextButtonProps);

export const Button = (props: ButtonProps) => {
    const className = `fade-colors-transition ${styles.button} ${styles[props.variant]} ${props.className}`;
    const content = isIconButton(props)
        ? <SvgIcon
            name={props.icon}
            variant={props.variant}
        />
        : props.text;
    const ariaLabel = isIconButton(props) && { 'aria-label': props.description };

    if (props.href !== undefined) {
        return (
            <a
                className={className}
                href={props.href}
                target='_blank'
                rel='noopener noreferrer'
                {...ariaLabel}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            className={className}
            onClick={props.onClick}
            aria-expanded={props['aria-expanded']}
            aria-controls={props['aria-controls']}
            {...ariaLabel}
        >
            {content}
        </button>
    );
};
