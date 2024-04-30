import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urlCleanup } from "../../../utils/urlCleanup";

export const Body: FC<any> = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        urlCleanup()
    }, [location]);

    return (
        <>
            {children}
        </>
    )
}