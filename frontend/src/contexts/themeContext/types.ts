import { Colors } from "./themes";

export type ThemeType = 'green' | 'dark' | 'sandstone' | 'gray' | 'light'

export type ThemesType = Record<ThemeType, Theme>

export interface Theme {
    body: Colors,
    color: Colors,
    subBarBackground: Colors,
    addCategoryBtnBackground: Colors,
    modalBackground: Colors,
    buttonBackground: Colors,
    buttonBackgroundHover: Colors,
    enteringModalBackground: Colors,
    statisticsBackground: Colors,
    statisticsLineDayBackground: Colors,
    buttonGroupColor: Colors,
    buttonActiveGroupColor: Colors,
    buttonGroupHover: Colors,
    inputBorder: Colors,
    dataPikerIcon: Colors,
    inputBorderHover: Colors,
    inputBorderFocused: Colors,
    labelFocused: Colors,
    lineBackgroundHover: Colors,
    buttonDisabledBackground: Colors,
    settingsOptionsTabActive: Colors,
    datePikerLayout: Colors,
    pickersDaySelected: Colors,
    pickersDayHover: Colors,
    modalLayoutShadow: Colors,
    selectHover: Colors,
    selectSelected: Colors,
    settingsBackground: Colors,
    showPasswordIconColor: Colors,
    themeSelectionBlockBackground: Colors,
    subBarLinkColor: Colors,
    enteringModalColor: Colors,
    enteringModalBtnBackground: Colors,
    loaderColor: Colors,
    chartBlockBackground: Colors,
    chartBlockBackgroundHover: Colors,
    settingsTabBtnSelected: Colors,
    settingsTabBtnHover: Colors,
    pieChartStroke: Colors,
    budgetPlannerBackground: Colors,
    budgetPlannerRowBorder: Colors,
}

export interface ThemeContextType {
    currentTheme: ThemeType,
    changeTheme: (value: 'green' | 'dark') => void;
    themeStyles: Theme
}

export interface ThemeStyledProps {
    themestyles: Theme,
    theme?: ThemeType
}

export interface ThemeContextProviderProps {
    children: React.ReactNode
}