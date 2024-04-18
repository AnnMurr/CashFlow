import { FC } from "react";
import { Form } from "./form/form";
import { Banner } from "./banner/banner";
import { Container, Section, Wrapper } from "./styledLoginPage";

export const LoginPage: FC = () => {

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