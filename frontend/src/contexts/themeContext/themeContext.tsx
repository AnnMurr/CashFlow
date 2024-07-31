import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { RootState, UserStorageDataType } from "../../redux/reducers/userStorageReduser/types";
import { getDataFromLocalStorage } from "../../storage/localStorage/localStorage";
import { changeUserData, getDataFromUserStore } from "../../redux/reducers/userStorageReduser/userStorageReduser";
import { ThemeContextProviderProps, ThemeContextType, ThemeType } from "./types";
import { Themes } from "./themes";

const initialThemeContext: ThemeContextType = {
    currentTheme: 'green',
    changeTheme: () => { },
    themeStyles: Themes['green']
}

export const ThemeContext = React.createContext<ThemeContextType>(initialThemeContext)

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('dark')
    const togleTheme = () => setTheme(theme === 'green' ? 'green' : 'dark')
    const { storageData } = useAppSelector((state: RootState) => state.storage);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     storageData &&  setTheme(storageData.settings.theme) 
    // }, [storageData])

//     useEffect(() => {

//         const setThemeToUserStorage = async () => {
//             if (storageData?.settings.theme !== theme) {
//                 try {
//                     const token = getDataFromLocalStorage("token");
//                     const dataFromUserStore = (await dispatch(getDataFromUserStore(token))).payload as UserStorageDataType;

//                     const updatedData = {
//                         ...dataFromUserStore,
//                         settings: {
//                             ...dataFromUserStore.settings,
//                             theme: theme
//                         }
//                     };

//                     const userDataAfterUpdate = (await dispatch(changeUserData({ userToken: token, updatedData: updatedData }))).payload;
// console.log(userDataAfterUpdate)
//                     // if (userDataAfterUpdate) {
//                     //     getAlert({ type: "success", text: "Currency changed successfully" }, setIsAlertActive, 3000);
//                     //     setIsCurrencyChoosingModalActive(false);
//                     // }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }
//         }
//         setThemeToUserStorage();
//     }, [theme])

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