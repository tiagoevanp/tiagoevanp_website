import { css } from '@emotion/react';

import { useTheme } from '../providers/hooks/useTheme';
import type { NameProp } from './hooks/useDynamicSvgImport';
import { SvgIcon, type SvgIconProps } from './SvgIcon';

type ButtonProps = {
    transparent?: boolean
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
    const { onClick, style, transparent } = props;

    const { colors, uiUtils } = useTheme();

    const styles = {
        button: css({
            fontSize: '16px',
            border: 'none',
            borderRadius: '48px 0 48px 0',
            backgroundColor: transparent ? 'transparent' : colors.backgroundButton,
            padding: 0,
            cursor: 'pointer',
            width: '96px',
            height: '96px',
            textAlign: 'center',
            boxShadow: !transparent ? uiUtils.shadow : 'none',
            '& svg': {
                fill: transparent ? colors.icon : colors.iconSecondary,
                width: '64px',
            },
            ...style,
        }),
    };

    return (
        <button
            className='fade-background-transition'
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
