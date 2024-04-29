import { FC } from "react";
import { Container, Content, Error, SubTitle } from "./styledErrorPage";

export const ErrorPage: FC = () => {
    return (
        <section>
            <Container>
                <Content>
                    <Error>
                        <h2>404</h2>
                    </Error>
                    <SubTitle>
                        <span>Ooops...</span>
                    </SubTitle>
                    <SubTitle>
                        <h2>Sorry, the page not found</h2>
                    </SubTitle>
                </Content>
            </Container>
        </section>
    )
}