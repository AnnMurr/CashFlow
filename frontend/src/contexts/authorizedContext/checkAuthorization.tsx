import { FC, useContext } from "react"
import { AuthorizedContext } from "./authorizedContext"
import { Navigate } from "react-router-dom"

export const CheckAuthorization: FC<any> = ({ children }) => {
    const { isAuthorized } = useContext<any>(AuthorizedContext)

    return isAuthorized ? <Navigate to='*' /> : <>{children}</>
}