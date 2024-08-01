import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Inner } from "./styledTitle";

export const Title: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Inner themestyles={themeContext.themeStyles}>
            <h3>
                You currently have no data.
                Start by adding your financial information to see statistics here.
            </h3>
        </Inner>
    )
}