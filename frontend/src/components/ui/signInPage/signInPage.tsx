import { FC, useState } from "react";
import { Form } from "./components/form/form";
import { Banner } from "./components/banner/banner";
import { BtnGoToMainPage } from "../../shared/btnGoToMainPage/btnGoToMainPage";
import { AlertComponentProps, AlertComponent } from "../../shared/alert/alert";
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