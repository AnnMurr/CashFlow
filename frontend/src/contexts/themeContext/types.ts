import { Colors } from "./themes";

export type ThemeType = 'green' | 'dark'

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
    selectHover: Colors,
    inputBorder: Colors,
    dataPikerIcon: Colors,
    inputBorderHover: Colors,
    inputBorderFocused: Colors,
    labelFocused: Colors,
    categoryBackgroundHover: Colors,
    buttonDisabledBackground: Colors,
}

export interface ThemeContextType {
    currentTheme: ThemeType,
    changeTheme: () => void,
    themeStyles: Theme
}

export interface ThemeStyledProps {
    themestyles: Theme,
    theme?: ThemeType
}

export interface ThemeContextProviderProps {
    children: React.ReactNode
}