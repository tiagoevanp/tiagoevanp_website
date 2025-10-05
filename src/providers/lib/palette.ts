export const palette = {
    IMPERIAL_RED: '#E43636',
    INDIAN_RED: '#E35959',
    MIDNIGHT_GREEN: '#114B5F',
    DARK_SLATE_GRAY: '#2F535E',
    ZOMP: '#539987',
    CAMBRIDGE_BLUE: '#73998F',
    AMBER: '#F3B700',
    NAPLES_YELLOW: '#F2CE61',
    GUNMETAL: '#1E2528',
    EERIE_BLACK: '#1F1F1F',
    SEA_SALT: '#FAFAFA',
    SILVER: '#AEAEAE',
    DIM_GRAY: '#6E6E6E',
} as const;

type PaletteValues = (typeof palette)[keyof typeof palette] | 'transparent';

export interface IColorScheme {
    page: { background: PaletteValues },
    navbar: {
        border: PaletteValues,
        link: {
            color: PaletteValues,
            hover: { color: PaletteValues },
            selected: { background: PaletteValues, color: PaletteValues },
        },
    },
    sidebar: { border: PaletteValues, },
    home: {
        image: { primaryBackground: PaletteValues, secondaryBackground: PaletteValues },
    },
    section: {
        text: {
            title: { color: PaletteValues },
            color: PaletteValues,
        },
    },
    icon: {
        fill: { color: PaletteValues, hover: PaletteValues },
    },
    input: {
        icon: PaletteValues,
        border: PaletteValues,
        placeholder: PaletteValues,
        value: PaletteValues,
    },
}
