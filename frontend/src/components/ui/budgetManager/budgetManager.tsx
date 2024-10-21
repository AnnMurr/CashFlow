import { FC } from "react";
import { Body } from "../../shared/body/body";
import { SubBar } from "../../shared/subBar/subBar";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import { Block } from "./components/block/block";
import { Container, Links, Wrapper } from "./styledBudgetManager";

export const BudgetManager: FC = () => {
    return (
        <Body>
            <section>
                <Container>
                    <Wrapper>
                        <SubBar />
                        <Links>
                            <Block
                                goToLink="/financial-plans"
                                name="Plans"
                                icon={faRectangleList} />
                            <Block
                                goToLink="/budget-planner"
                                name="Create plan"
                                icon={faFilePen} />
                        </Links>
                    </Wrapper>
                </Container>
            </section>
        </Body>
    )
}