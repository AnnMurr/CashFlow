import { FC, useContext } from "react";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Container, Wrapper } from "./styledFiltersModalContainer";

interface FiltersModalContainerProps {
    children: React.ReactNode
}

export const FiltersModalContainer: FC<FiltersModalContainerProps> = ({ children }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                {children}
            </Wrapper>
        </Container>
    )
}