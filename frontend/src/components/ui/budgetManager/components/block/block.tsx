import { FC, useContext } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { Container, Title } from "./styledBlock";

interface BlockProps {
    goToLink: string;
    name: string;
    icon: IconDefinition;
}

export const Block: FC<BlockProps> = ({ goToLink, name, icon }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles} to={goToLink}>
            <FontAwesomeIcon size="3x" color={themeContext.themeStyles.color} icon={icon} />
            <Title>
                <h3>{name}</h3>
            </Title>
        </Container>
    )
}