import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urlCleanup } from "../../../utils/urlCleanup";

interface BodyProps {
    children: React.ReactNode;
}

export const Body: FC<BodyProps> = ({ children }) => {
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