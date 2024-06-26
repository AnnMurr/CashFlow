import React, { FC, createContext, useEffect, useState } from "react";
import { getUserAuth } from "../../utils/checkUserAuth";
import { useAppDispatch } from "../../redux/store/store";
import { getUserDataById } from "../../redux/reducers/userReducer/userReducer";
import { getDataFromUserStore } from "../../redux/reducers/userStorageReduser/userStorageReduser";
import { getDataFromLocalStorage } from "../../storage/localStorage/localStorage";
export interface AuthorizedContextType {
    login: () => void;
    logOut: () => void;
    isAuthorized: boolean;
}
export interface AuthorizedContextProviderProps {
    children: React.ReactNode;
}

const InitialAuthorizedContext = {
    login: () => { },
    logOut: () => { },
    isAuthorized: false
}

export const AuthorizedContext = createContext<AuthorizedContextType>(InitialAuthorizedContext);

export const AuthorizedContextProvider: FC<AuthorizedContextProviderProps> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(getUserAuth());
    const login = () => { setIsAuthorized(true) };
    const logOut = () => { setIsAuthorized(false) };
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getDataFromLocalStorage("token");
        isAuthorized && dispatch(getUserDataById());
        isAuthorized && dispatch(getDataFromUserStore(token));
    }, [isAuthorized])

    return (
        <AuthorizedContext.Provider
            value={{
                login,
                logOut,
                isAuthorized
            }}>
            {children}
        </AuthorizedContext.Provider>
    )
}