import { FC, useContext } from "react";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Inner } from "./styledName";

interface NameProps {
    text: string;
    icon: IconDefinition
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