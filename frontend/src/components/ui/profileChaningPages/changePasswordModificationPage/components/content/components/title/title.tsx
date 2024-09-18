import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Inner } from "./styledTitle";

export const Title: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Inner themestyles={themeContext.themeStyles}>
            <h5>
                Enter new password
            </h5>
        </Inner>
    )
}