import { FC } from "react";
import { SubBar } from "../../shared/subBar/subBar";
import { Header } from "./components/header/header";
import { List } from "./components/list/list";
import { Container, Wrapper } from "./styledStatistics";

export const Statistics: FC = () => {
    return (
        <section>
            <Container>
                <Wrapper>
                    <SubBar />
                    <Header />
                    <List />
                </Wrapper>
            </Container>
        </section >
    )
}