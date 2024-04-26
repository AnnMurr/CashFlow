import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Heading } from "./components/heading/heading";
import { Body } from "./components/body/body";
import { Container, Wrapper } from "./styledExpensesPage";

export const ExpensesPage: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Heading />
                    <Body />
                </Wrapper>
            </Container>
        </section>
    )
}