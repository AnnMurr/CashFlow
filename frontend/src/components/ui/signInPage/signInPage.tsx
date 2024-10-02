import { FC, useState } from "react";
import { AlertComponentProps } from "../../shared/alert/alert";
import { Banner, BtnGoToMainPage, Form, AlertComponent } from ".";
import { Container, Section, Wrapper, Content } from "./styledSignInPage";

export const SignInPage: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);

    return (
        <Section>
            <Container>
                <Wrapper>
                    <BtnGoToMainPage />
                    <Content>
                        <Form setIsAlertActive={setIsAlertActive} />
                        <Banner />
                    </Content>
                    {isAlertActive ?
                        <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                        : null}
                </Wrapper>
            </Container>
        </Section>
    )
}