import { FC, useContext } from "react";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";
import { Block, Container, Links, Title, Wrapper } from "./styledBudgetManager";

export const BudgetManager: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Links>
                            <Block themestyles={themeContext.themeStyles} to={"/financial-plans"}>
                                <FontAwesomeIcon size="3x" color={themeContext.themeStyles.color} icon={faRectangleList} />
                                <Title>
                                    <h3>plans</h3>
                                </Title>
                            </Block>
                            <Block themestyles={themeContext.themeStyles} to={"/budget-planner"}>
                                <FontAwesomeIcon size="3x" color={themeContext.themeStyles.color} icon={faFilePen} />
                                <Title>
                                    <h3>Create plan</h3>
                                </Title>
                            </Block>
                        </Links>
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}