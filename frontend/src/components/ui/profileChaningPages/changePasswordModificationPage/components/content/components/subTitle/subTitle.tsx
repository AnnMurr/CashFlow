import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../contexts/themeContext/themeContext";
import { Inner } from "./styledSubTitle";

export const SubTitle: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Inner themestyles={themeContext.themeStyles}>
            <span>
                Choose a strong password and do not use it for other accounts
            </span>
        </Inner>
    )
}