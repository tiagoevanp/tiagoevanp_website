import { NameProp } from '../SvgIcon/icons';
import { SvgIcon, type SvgIconProps } from '../SvgIcon/SvgIcon';
import styles from './Button.module.sass';

type ButtonProps = {
    onClick: () => void;
    variant: 'small' | 'medium' | 'large';
    style?: React.CSSProperties;
};

type IconButtonProps = ButtonProps & Omit<SvgIconProps, 'name' | 'variant'> & {
    icon: NameProp;
};

type TextButtonProps = ButtonProps & {
    text: string;
};

const isIconButton = (props: ButtonProps): props is IconButtonProps => {
    return (props as IconButtonProps).icon !== undefined;
};

export const Button = (props: IconButtonProps | TextButtonProps) => {
    return (
        <button
            className={`fade-colors-transition ${styles.button} ${styles[props.variant]}`}
            onClick={props.onClick}
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
