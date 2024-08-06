import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { RootState, UserStorageDataType } from "../../redux/reducers/userStorageReduser/types";
import { getDataFromLocalStorage, setDataToLocalStorage } from "../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../redux/reducers/userStorageReduser/userStorageReduser";
import { ThemeContextProviderProps, ThemeContextType, ThemeType } from "./types";
import { Themes } from "./themes";

const initialThemeContext: ThemeContextType = {
    currentTheme: 'green',
    changeTheme: (value) => { },
    themeStyles: Themes['green']
}

export const ThemeContext = React.createContext<ThemeContextType>(initialThemeContext)

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const themeFromLocalStorage: ThemeType | null = getDataFromLocalStorage('theme');
    const currentTheme: ThemeType = themeFromLocalStorage || 'green';
    const [theme, setTheme] = useState<ThemeType>(currentTheme);
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    const setThemeToUserStorage = async (value: ThemeType) => {
        if (value) {
          
            try {
                const token = getDataFromLocalStorage('token');
                const dataFromUserStore = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;

                const updatedData = {
                    ...dataFromUserStore,
                    settings: {
                        ...dataFromUserStore.settings,
                        theme: value
                    }
                };

                (await dispatch(changeUserData({ userToken: token, updatedData: updatedData })));
            } catch (error) {
                console.error(error);
            }
        }
    }

    const togleTheme = async (value: 'green' | 'dark') => {
        await setThemeToUserStorage(value)
        setTheme(value)
    }

    useEffect(() => {
        if(storageData) {
            setTheme(storageData.settings.theme);
            setDataToLocalStorage('theme', storageData.settings.theme)
        }
    }, [storageData]);

    return (
        <ThemeContext.Provider value={{
            currentTheme: theme,
            changeTheme: togleTheme,
            themeStyles: Themes[theme]
        }}>
            {children}
        </ThemeContext.Provider>
    )
}