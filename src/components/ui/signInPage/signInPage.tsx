import { FC } from "react";
import { Form } from "./components/form/form";
import { Banner } from "./components/banner/banner";
import { BtnGoToMainPage } from "../../shared/btnGoToMainPage/btnGoToMainPage";
import { Container, Section, Wrapper, Content } from "./styledSignInPage";

export const SignInPage: FC = () => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <BtnGoToMainPage />
                    <Content>
                        <Form />
                        <Banner />
                    </Content>
                </Wrapper>
            </Container>
        </Section>
    )
}