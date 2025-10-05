import { type IColorScheme, palette } from './palette';

export const darkThemeColors: IColorScheme = {
    page: {
        background: palette.GUNMETAL,
    },
    navbar: {
        border: palette.DARK_SLATE_GRAY,
        link: {
            color: palette.SEA_SALT,
            hover: {
                color: palette.SEA_SALT,
            },
            selected: {
                background: palette.DARK_SLATE_GRAY,
                color: palette.SEA_SALT,
            },
        },
    },
    sidebar: { border: palette.DARK_SLATE_GRAY },
    home: {
        image: {
            primaryBackground: palette.CAMBRIDGE_BLUE,
            secondaryBackground: 'transparent',
        },
    },
    section: {
        text: {
            title: {
                color: palette.CAMBRIDGE_BLUE,
            },
            color: palette.SEA_SALT,
        },
    },
    icon: {
        fill: {
            color: palette.DARK_SLATE_GRAY,
            hover: palette.CAMBRIDGE_BLUE,
        },
    },
    input: {
        icon: palette.CAMBRIDGE_BLUE,
        border: palette.CAMBRIDGE_BLUE,
        placeholder: palette.DIM_GRAY,
        value: palette.SEA_SALT,
    },
};
