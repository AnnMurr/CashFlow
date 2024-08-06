import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Arrow, Category, Container, Value, Wrapper } from "./styledItem";

interface ItemProps {
    value?: string;
    category: string;
    link: string;
}

export const Item: FC<ItemProps> = ({ value, category, link }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper to={link} >
                <div>
                    <Category themestyles={themeContext.themeStyles}>
                        {category}
                    </Category>
                </div>
                <div>
                    <Value themestyles={themeContext.themeStyles}>
                        {value && category === "Password" ? value.replaceAll(/\S/gi, "*") : value}
                    </Value>
                </div>
                <Arrow>
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faArrowRight} />
                </Arrow>
            </Wrapper>
        </Container>
    )
}