import { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, NavLinkStyled } from "./styledItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContextType } from "../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../contexts/themeContext/themeContext";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
interface ItemProps {
    isAtiveBar: boolean;
    icon: IconDefinition;
    linkTo: string;
    text: string;
}

export const Item: FC<ItemProps> = ({ icon, isAtiveBar, linkTo, text }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container>
            <NavLink to={linkTo}>
                {({ isActive }) => (
                    <NavLinkStyled
                        themestyles={themeContext.themeStyles}
                        to={linkTo} isActive={isActive}>
                        <FontAwesomeIcon
                            size="lg"
                            color={themeContext.themeStyles.subBarLinkColor}
                            icon={icon} />
                        {isAtiveBar ?
                            <span>
                                {text}
                            </span>
                            : null}
                    </NavLinkStyled>
                )}
            </NavLink>
        </Container>
    )
}