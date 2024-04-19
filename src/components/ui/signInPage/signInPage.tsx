import { FC } from "react";
import { Container, Section, Wrapper } from "./styledSignUpPage";
import { Form } from "./components/form/form";
import { Banner } from "./components/banner/banner";

export const SignUpPage: FC = () => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <Form />
                    <Banner />
                </Wrapper>
            </Container>
        </Section>
    )
}