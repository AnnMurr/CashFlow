import { FC } from "react";
import { Form } from "./components/form/form";
import { Banner } from "./components/banner/banner";
import { BtnGoToMainPage } from "../../shared/btnGoToMainPage/btnGoToMainPage";
import { Container, Content, Section, Wrapper } from "./styledSignUpPage";

export const SignUpPage: FC = () => {
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