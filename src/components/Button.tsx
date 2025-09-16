import { css } from '@emotion/react';

import { useTheme } from '../providers/hooks/useTheme';
import { Icon } from './Icon';

type ButtonProps = {
    transparent?: boolean
    onClick: () => void;
    style?: React.CSSProperties;
};

type IconButtonProps = ButtonProps & {
    icon: string;
    category?: 'solid' | 'regular' | 'brands';
};

type TextButtonProps = ButtonProps & {
    text: string;
};

const isIconButton = (props: ButtonProps): props is IconButtonProps => {
    return (props as IconButtonProps).icon !== undefined;
};

export const Button = (props: IconButtonProps | TextButtonProps) => {
    const { onClick, style, transparent } = props;

    const { colors } = useTheme();

    const styles = {
        button: css({
            fontSize: '16px',
            border: 'none',
            borderRadius: '64px 0 64px 0',
            backgroundColor: transparent ? 'transparent' : colors.backroundButton,
            padding: transparent ? 0 : '32px',
            cursor: 'pointer',
            width: 'fit-content',
            height: 'fit-content',
            textAlign: 'center',
            ...style,
        }),
    };

    return (
        <button
            css={styles.button}
            onClick={onClick}
        >
            {isIconButton(props)
                ? <Icon
                    name={props.icon}
                    category={props.category}
                    style={{ color: transparent ? colors.icon : colors.iconSecondary }}
                />
                : props.text
            }
        </button>
    );
};