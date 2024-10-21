import { FC, useState } from "react";
import { AlertComponentProps } from "../../shared/alert/alert"
import { Banner, BtnGoToMainPage, Form, AlertComponent } from ".";
import { useAppSelector } from "../../../redux/store/store";
import { Spinner } from "../../shared/spinner/spinner";
import { Container, Content, LoadingInner, Section, Wrapper } from "./styledSignUpPage";

export const SignUpPage: FC = () => {
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const { loading } = useAppSelector((state => state.user));

    return (
        <Section>
            <Container>
                <Wrapper>
                    <BtnGoToMainPage />
                    {loading ?
                        <LoadingInner>
                            <Spinner size={40} height={3} />
                        </LoadingInner>
                        : <Content>
                            <Form setIsAlertActive={setIsAlertActive} />
                            <Banner />
                        </Content>}
                    {isAlertActive ?
                        <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                        : null}
                </Wrapper>
            </Container>
        </Section>
    )
}