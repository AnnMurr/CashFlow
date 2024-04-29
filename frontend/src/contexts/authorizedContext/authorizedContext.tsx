import { FC, createContext, useState } from "react";
import { getUserAuth } from "../../utils/checkUserAuth";

const InitialAuthorizedContext = {
    login: () => { },
    logOut: () => { },
    isAuthorized: false
}

export const AuthorizedContext = createContext(InitialAuthorizedContext);

export const AuthorizedContextProvider: FC<any> = ({ children }) => {
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