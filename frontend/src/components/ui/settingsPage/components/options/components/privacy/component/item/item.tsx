import { FC, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faArrowRight, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { ThemeContextType } from "../../../../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../../../../contexts/themeContext/themeContext";
import { Container, QuestionMark, SubTitle, Title, Wrapper } from "./styledItem";

interface ItemProps {
    title: string;
    subTitle: string;
    icon: IconDefinition;
    link: string;
}

export const Item: FC<ItemProps> = ({ link, icon, title, subTitle }) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper to={link}>
                <div>
                    <FontAwesomeIcon icon={icon} color={themeContext.themeStyles.color} />
                </div>
                <Title themestyles={themeContext.themeStyles}>
                    <h4>
                        {title}
                    </h4>
                </Title>
                <QuestionMark themestyles={themeContext.themeStyles}>
                    <FontAwesomeIcon icon={faQuestion} size="2xs" color={themeContext.themeStyles.color} />
                </QuestionMark>
                <SubTitle themestyles={themeContext.themeStyles}>
                    <span>
                        {subTitle}
                    </span>
                </SubTitle>
                <div>
                    <FontAwesomeIcon color={themeContext.themeStyles.color} icon={faArrowRight} />
                </div>
            </Wrapper>
        </Container>
    )
}