import { css } from '@emotion/react';

import { useTheme } from '../providers/hooks/useTheme';
import type { NameProp } from './hooks/useDynamicSvgImport';
import { SvgIcon, type SvgIconProps } from './SvgIcon';

type ButtonProps = {
    onClick: () => void;
    style?: React.CSSProperties;
};

type IconButtonProps = ButtonProps & Omit<SvgIconProps, 'name' | 'style'> & {
    icon: NameProp;
};

type TextButtonProps = ButtonProps & {
    text: string;
};

const isIconButton = (props: ButtonProps): props is IconButtonProps => {
    return (props as IconButtonProps).icon !== undefined;
};

export const Button = (props: IconButtonProps | TextButtonProps) => {
    const { onClick, style } = props;

    const { colors } = useTheme();

    const styles = {
        button: css({
            border: 'none',
            backgroundColor: 'transparent',
            padding: 0,
            cursor: 'pointer',
            width: '32px',
            height: '32px',

            '&:hover': {
                '& svg': {
                    display: 'block',
                    transform: 'scale(1.4)',
                    rotate: '15deg',

                    '& path': {
                        fill: colors.icon.fill.hover,
                    },
                },
            },

            '& svg': {
                width: '32px',
                transition: 'rotate 0.2s ease-out, transform 0.2s linear',

                '& path': {
                    fill: colors.icon.fill.color,
                },
            },
            ...style,
        }),
    };

    return (
        <button
            className='fade-colors-transition'
            css={styles.button}
            onClick={onClick}
        >
            {isIconButton(props)
                ? <SvgIcon
                    name={props.icon}
                />
                : props.text
            }
        </button>
    );
};
