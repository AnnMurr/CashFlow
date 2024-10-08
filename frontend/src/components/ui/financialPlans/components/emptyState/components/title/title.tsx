import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../contexts/themeContext/themeContext";
import { Inner } from "./styledTitle";

export const Title: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Inner themestyles={themeContext.themeStyles}>
            <h5>
                You currently have no data.
                Start by adding your a budget plan to see plans here
            </h5>
        </Inner>
    )
}