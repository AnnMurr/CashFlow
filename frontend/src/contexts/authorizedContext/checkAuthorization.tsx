import React, { FC, useContext } from "react";
import { AuthorizedContext, AuthorizedContextType } from "./authorizedContext";
import { Navigate } from "react-router-dom";

interface CheckNotAuthorizationProps {
    children: React.ReactNode;
}

export const CheckNotAuthorization: FC<CheckNotAuthorizationProps> = ({ children }) => {
    const { isAuthorized } = useContext<AuthorizedContextType>(AuthorizedContext);

    return !isAuthorized ? <Navigate to='/sign-up' /> : <>{children}</>
}

export const CheckAuthorization: FC<CheckNotAuthorizationProps> = ({ children }) => {
    const { isAuthorized } = useContext<AuthorizedContextType>(AuthorizedContext);

    return isAuthorized ? <Navigate to={"*"} replace={true} /> : <>{children}</>
}