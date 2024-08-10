import { ThemesType } from "./types";

export enum Colors {
    BLACK = '#000',
    WHITE = '#fff',
    TRANSPARENT_BLACK = 'rgba(0, 0, 0, 0.12)',
    TRANSPARENT_WHITE = 'rgba(255, 255, 255, 0.3)',
    CORIANDER = '#1c1919',
    COD_GRAY = '#131313',
    COD_GRAY_DARK = '#0c0b0b',
    COD_GRAY_MEDIUM = '#171717',
    COD_GRAY_LIGHT = '#1c1b1b',
    COD_GRAY_BROWN = '#1f1c1c',
    SPRING_LEAVES = '#5B8A72',
    SPRING_LEAVES_TRANSPARENT = '#56776c99',
    GREEN_TRANSPARENT = 'rgb(49 163 71 / 4%)',
    DARK_GREEN_TRANSPARENT = '#56776c21',
    GRAY_TRANSPARENT = '#9e9d9d0a',
    SOFT_PEACH = '#F5EDED',
    CABBAGE_PONT = '#464F41',
    MASALA = '#3E3636',
    BOTTLE_GREEN = '#0f4a34',
    ATHENS_GRAY = '#f3f4f6',
    DUSTY_GRAY = '#9e9d9d',
    DUSTY_GRAY_TRANSPARENT = '#9e9d9d59',
    TRANSPARENT = '#fff0',
    BOULDER = '#797979',
    SAN_MARINO = '#3f51b5',
    SAPPHIRE = '#27399b',
    SAPHIRE_TRANSPARENT = '#27399b59',
    PALE_GRAY_OPACITY = '#e5e5e58a',

    SANDSTONE = '#776B5D',
    NAPA = '#dcd0bb',
    NAPA_TRANSPARENT = '#b0a6952e',
    WHITE_ROCK = '#EBE3D5',
    PAMPAS = '#F3EEEA',
    ARMADILLO = '#494137',

    EMPERORAPPROX = '#525252',
    EMPERORAPPROX_TRANSPARENT = '#525252c4',
    TUNDORA = '#414141',
    MINE_SHAFT = '#333333',
    FLUSH_MAHOGANY = '#313131',
    GREEN_HAZE = '#009D67',
    TROPICAL_RAIN_FOREST = '#007b51',
    DOVE_GRAY = '#6f6f6fc4',
    DOVE_GRAY_TRANSPARENT = '#6c6c6c52',

    AQUA_HAZE = '#f6f8fa',
    DANUBE = '#6886C5',
    DANUBE_TRANSPARENT = '#6886c559',
}

export const Themes: ThemesType = {
    green: {
        body: Colors.WHITE,
        color: Colors.BLACK,
        subBarBackground: Colors.SPRING_LEAVES,
        subBarLinkColor: Colors.WHITE,
        addCategoryBtnBackground: Colors.CABBAGE_PONT,
        modalBackground: Colors.WHITE,
        buttonBackground: Colors.SPRING_LEAVES,
        buttonBackgroundHover: Colors.BOTTLE_GREEN,
        enteringModalBackground: Colors.COD_GRAY_LIGHT,
        enteringModalColor: Colors.WHITE,
        enteringModalBtnBackground: Colors.WHITE,
        statisticsBackground: Colors.ATHENS_GRAY,
        settingsBackground: Colors.ATHENS_GRAY,
        statisticsLineDayBackground: Colors.SPRING_LEAVES_TRANSPARENT,
        buttonGroupColor: Colors.BLACK,
        buttonActiveGroupColor: Colors.SPRING_LEAVES,
        buttonGroupHover: Colors.GREEN_TRANSPARENT,
        dataPikerIcon: Colors.COD_GRAY_LIGHT,
        inputBorder: Colors.DUSTY_GRAY,
        inputBorderHover: Colors.BLACK,
        inputBorderFocused: Colors.SPRING_LEAVES,
        labelFocused: Colors.SPRING_LEAVES,
        lineBackgroundHover: Colors.PALE_GRAY_OPACITY,
        buttonDisabledBackground: Colors.TRANSPARENT_BLACK,
        settingsOptionsTabActive: Colors.BLACK,
        datePikerLayout: Colors.WHITE,
        pickersDaySelected: Colors.SPRING_LEAVES,
        pickersDayHover: Colors.SPRING_LEAVES_TRANSPARENT,
        modalLayoutShadow: Colors.TRANSPARENT,
        selectHover: Colors.PALE_GRAY_OPACITY,
        selectSelected: Colors.TRANSPARENT_BLACK,
        showPasswordIconColor: Colors.BOULDER,
        themeSelectionBlockBackground: Colors.ATHENS_GRAY,
        loaderColor: Colors.BLACK,
    },
    dark: {
        body: Colors.COD_GRAY,
        color: Colors.WHITE,
        subBarBackground: Colors.COD_GRAY_DARK,
        subBarLinkColor: Colors.WHITE,
        addCategoryBtnBackground: Colors.SOFT_PEACH,
        modalBackground: Colors.COD_GRAY_MEDIUM,
        buttonBackground: Colors.SAN_MARINO,
        buttonBackgroundHover: Colors.SAPPHIRE,
        enteringModalBackground: Colors.COD_GRAY,
        enteringModalColor: Colors.WHITE,
        enteringModalBtnBackground: Colors.WHITE,
        statisticsBackground: Colors.COD_GRAY_DARK,
        settingsBackground: Colors.COD_GRAY_DARK,
        statisticsLineDayBackground: Colors.SOFT_PEACH,
        buttonGroupColor: Colors.WHITE,
        buttonActiveGroupColor: Colors.DUSTY_GRAY,
        buttonGroupHover: Colors.GRAY_TRANSPARENT,
        dataPikerIcon: Colors.ATHENS_GRAY,
        inputBorder: Colors.BOULDER,
        inputBorderHover: Colors.DUSTY_GRAY,
        inputBorderFocused: Colors.SAN_MARINO,
        labelFocused: Colors.SAN_MARINO,
        lineBackgroundHover: Colors.COD_GRAY_LIGHT,
        buttonDisabledBackground: Colors.DUSTY_GRAY,
        settingsOptionsTabActive: Colors.SOFT_PEACH,
        datePikerLayout: Colors.COD_GRAY_DARK,
        pickersDaySelected: Colors.SAPPHIRE,
        pickersDayHover: Colors.SAPHIRE_TRANSPARENT,
        modalLayoutShadow: Colors.TRANSPARENT_WHITE,
        selectHover: Colors.COD_GRAY_LIGHT,
        selectSelected: Colors.COD_GRAY_MEDIUM,
        showPasswordIconColor: Colors.DUSTY_GRAY,
        themeSelectionBlockBackground: Colors.COD_GRAY_MEDIUM,
        loaderColor: Colors.WHITE,
    },
    sandstone: {
        body: Colors.NAPA,
        color: Colors.BLACK,
        subBarBackground: Colors.SANDSTONE,
        subBarLinkColor: Colors.WHITE,
        addCategoryBtnBackground: Colors.SOFT_PEACH,
        modalBackground: Colors.WHITE_ROCK,
        buttonBackground: Colors.SANDSTONE,
        buttonBackgroundHover: Colors.ARMADILLO,
        enteringModalBackground: Colors.COD_GRAY,
        enteringModalColor: Colors.WHITE,
        enteringModalBtnBackground: Colors.WHITE,
        statisticsBackground: Colors.WHITE_ROCK,
        settingsBackground: Colors.WHITE_ROCK,
        statisticsLineDayBackground: Colors.PAMPAS,
        buttonGroupColor: Colors.BLACK,
        buttonActiveGroupColor: Colors.TRANSPARENT_BLACK,
        buttonGroupHover: Colors.GRAY_TRANSPARENT,
        dataPikerIcon: Colors.BLACK,
        inputBorder: Colors.BOULDER,
        inputBorderHover: Colors.DUSTY_GRAY,
        inputBorderFocused: Colors.SANDSTONE,
        labelFocused: Colors.SANDSTONE,
        lineBackgroundHover: Colors.NAPA_TRANSPARENT,
        buttonDisabledBackground: Colors.TRANSPARENT_BLACK,
        settingsOptionsTabActive: Colors.BLACK,
        datePikerLayout: Colors.SOFT_PEACH,
        pickersDaySelected: Colors.NAPA,
        pickersDayHover: Colors.NAPA_TRANSPARENT,
        modalLayoutShadow: Colors.TRANSPARENT,
        selectHover: Colors.NAPA_TRANSPARENT,
        selectSelected: Colors.NAPA,
        showPasswordIconColor: Colors.DUSTY_GRAY,
        themeSelectionBlockBackground: Colors.ATHENS_GRAY,
        loaderColor: Colors.BLACK,
    },
    gray: {
        body: Colors.EMPERORAPPROX,
        color: Colors.WHITE,
        subBarBackground: Colors.MINE_SHAFT,
        subBarLinkColor: Colors.WHITE,
        addCategoryBtnBackground: Colors.SOFT_PEACH,
        modalBackground: Colors.MINE_SHAFT,
        buttonBackground: Colors.GREEN_HAZE,
        buttonBackgroundHover: Colors.TROPICAL_RAIN_FOREST,
        enteringModalBackground: Colors.COD_GRAY,
        enteringModalColor: Colors.WHITE,
        enteringModalBtnBackground: Colors.WHITE,
        statisticsBackground: Colors.TUNDORA,
        settingsBackground: Colors.TUNDORA,
        statisticsLineDayBackground: Colors.PAMPAS,
        buttonGroupColor: Colors.WHITE,
        buttonActiveGroupColor: Colors.TRANSPARENT_WHITE,
        buttonGroupHover: Colors.GRAY_TRANSPARENT,
        dataPikerIcon: Colors.WHITE,
        inputBorder: Colors.BOULDER,
        inputBorderHover: Colors.DUSTY_GRAY,
        inputBorderFocused: Colors.COD_GRAY_LIGHT,
        labelFocused: Colors.WHITE,
        lineBackgroundHover: Colors.EMPERORAPPROX_TRANSPARENT,
        buttonDisabledBackground: Colors.DUSTY_GRAY,
        settingsOptionsTabActive: Colors.WHITE,
        datePikerLayout: Colors.EMPERORAPPROX,
        pickersDaySelected: Colors.DUSTY_GRAY,
        pickersDayHover: Colors.DUSTY_GRAY_TRANSPARENT,
        modalLayoutShadow: Colors.TRANSPARENT_BLACK,
        selectHover: Colors.DOVE_GRAY_TRANSPARENT,
        selectSelected: Colors.DOVE_GRAY,
        showPasswordIconColor: Colors.DUSTY_GRAY,
        themeSelectionBlockBackground: Colors.COD_GRAY_MEDIUM,
        loaderColor: Colors.WHITE,
    },
    light: {
        body: Colors.WHITE,
        color: Colors.BLACK,
        subBarBackground: Colors.AQUA_HAZE,
        subBarLinkColor: Colors.TUNDORA,
        addCategoryBtnBackground: Colors.DOVE_GRAY_TRANSPARENT,
        modalBackground: Colors.WHITE,
        buttonBackground: Colors.DANUBE,
        buttonBackgroundHover: Colors.SAN_MARINO,
        enteringModalBackground: Colors.WHITE,
        enteringModalColor: Colors.BLACK,
        enteringModalBtnBackground: Colors.AQUA_HAZE,
        statisticsBackground: Colors.AQUA_HAZE,
        settingsBackground: Colors.AQUA_HAZE,
        statisticsLineDayBackground: Colors.PALE_GRAY_OPACITY,
        buttonGroupColor: Colors.BLACK,
        buttonActiveGroupColor: Colors.TRANSPARENT_BLACK,
        buttonGroupHover: Colors.GRAY_TRANSPARENT,
        dataPikerIcon: Colors.BLACK,
        inputBorder: Colors.BOULDER,
        inputBorderHover: Colors.DUSTY_GRAY,
        inputBorderFocused: Colors.DANUBE,
        labelFocused: Colors.DANUBE,
        lineBackgroundHover: Colors.PALE_GRAY_OPACITY,
        buttonDisabledBackground: Colors.TRANSPARENT_BLACK,
        settingsOptionsTabActive: Colors.BLACK,
        datePikerLayout: Colors.WHITE,
        pickersDaySelected: Colors.DANUBE,
        pickersDayHover: Colors.DANUBE_TRANSPARENT,
        modalLayoutShadow: Colors.BLACK,
        selectHover: Colors.PALE_GRAY_OPACITY,
        selectSelected: Colors.TRANSPARENT_BLACK,
        showPasswordIconColor: Colors.BOULDER,
        themeSelectionBlockBackground: Colors.ATHENS_GRAY,
        loaderColor: Colors.BLACK,
    },
}