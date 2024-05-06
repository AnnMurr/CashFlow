import React, { FC, createContext, useState } from "react";
import { getUserAuth } from "../../utils/checkUserAuth";

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