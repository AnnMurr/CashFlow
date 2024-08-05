import { FC, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { urlCleanup } from "../../../utils/urlCleanup";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Container } from "./styledBody";

interface BodyProps {
    children: React.ReactNode;
}

export const Body: FC<BodyProps> = ({ children }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    const location = useLocation();

    useEffect(() => {
        urlCleanup();
    }, [location]);

    return (
        <Container themestyles={themeContext.themeStyles}>
            {children}
        </Container>
    )
}