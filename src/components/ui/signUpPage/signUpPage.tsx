import { FC } from "react";
import { Form } from "./components/form/form";
import { Banner } from "./components/banner/banner";
import { Container, Section, Wrapper } from "./styledSignUpPage";

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