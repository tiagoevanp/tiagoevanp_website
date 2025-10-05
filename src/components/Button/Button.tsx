import type { NameProp } from '../hooks/useDynamicSvgImport';
import { SvgIcon, type SvgIconProps } from '../SvgIcon/SvgIcon';
import styles from './Button.module.sass';

type ButtonProps = {
    onClick: () => void;
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
            className={`fade-colors-transition ${styles.button}`}
            onClick={props.onClick}
        >
            {isIconButton(props)
                ? <SvgIcon
                    name={props.icon}
                    variant='medium'
                />
                : props.text
            }
        </button>
    );
};
