import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inner } from "./styledName";

interface NameProps {
    text: string;
    icon: any
}

export const Name: FC<NameProps> = ({ text, icon }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Inner themestyles={themeContext.themeStyles}>
            <span>
                <FontAwesomeIcon icon={icon} /> {text}
            </span>
        </Inner>
    )
}