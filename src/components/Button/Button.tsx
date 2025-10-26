import { NameProp } from '../SvgIcon/icons';
import { SvgIcon, type SvgIconProps } from '../SvgIcon/SvgIcon';
import styles from './Button.module.sass';

type DefaultButtonProps = {
    onClick: () => void;
    variant: 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
    role?: 'menuitem';
};

type IconButtonProps = DefaultButtonProps & Omit<SvgIconProps, 'name' | 'variant'> & {
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
    return (
        <button
            role={props.role}
            className={`fade-colors-transition ${styles.button} ${styles[props.variant]}`}
            onClick={props.onClick}
            {...(isIconButton(props) && { 'aria-label': props.description })}
        >
            {isIconButton(props)
                ? <SvgIcon
                    name={props.icon}
                    variant={props.variant}
                />
                : props.text
            }
        </button>
    );
};
