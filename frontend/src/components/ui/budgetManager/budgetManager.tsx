import { FC, useContext } from "react";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { Block, Container, Wrapper } from "./styledBudgetManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { ThemeContextType } from "../../../contexts/themeContext/types";
import { ThemeContext } from "../../../contexts/themeContext/themeContext";

export const BudgetManager: FC = () => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Block themestyles={themeContext.themeStyles} to={"/"}>

                                <FontAwesomeIcon size="3x" color={themeContext.themeStyles.color} icon={faRectangleList} />
                                <div>
                                    <h3>Compleated plans</h3>
                                </div>
                            </Block>
                            <Block themestyles={themeContext.themeStyles} to={"/budget-planner"}>

                                <FontAwesomeIcon size="3x" color={themeContext.themeStyles.color} icon={faFilePen} />
                                <div>
                                    <h3>Create plan</h3>
                                </div>
                            </Block>
                        </div>
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}