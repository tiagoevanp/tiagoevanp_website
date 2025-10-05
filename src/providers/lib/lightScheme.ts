import { type IColorScheme, palette } from './palette';

export const lightThemeColors: IColorScheme = {
    page: {
        background: palette.SEA_SALT,
    },
    navbar: {
        border: palette.MIDNIGHT_GREEN,
        link: {
            color: palette.MIDNIGHT_GREEN,
            hover: {
                color: palette.MIDNIGHT_GREEN,
            },
            selected: {
                background: palette.MIDNIGHT_GREEN,
                color: palette.SEA_SALT,
            },
        },
    },
    sidebar: { border: palette.MIDNIGHT_GREEN },
    home: {
        image: {
            primaryBackground: palette.ZOMP,
            secondaryBackground: 'transparent',
        },
    },
    section: {
        text: {
            title: {
                color: palette.ZOMP,
            },
            color: palette.EERIE_BLACK,
        },
    },
    icon: {
        fill: {
            color: palette.MIDNIGHT_GREEN,
            hover: palette.ZOMP,
        },
    },
    input: {
        icon: palette.MIDNIGHT_GREEN,
        border: palette.MIDNIGHT_GREEN,
        placeholder: palette.SILVER,
        value: palette.EERIE_BLACK,
    },
};
