import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Container } from "./styledCategoryName";

interface CategoryNameProps {
    name: string;
}

export const CategoryName: FC<CategoryNameProps> = ({ name }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    
    return (
        <Container themestyles={themeContext.themeStyles}>
            <span>{name}</span>
        </Container>
    )
}