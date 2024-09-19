import { FC, useContext, useState } from "react";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { InfoBlock, Input, SubTitle, SubmitButton, Title, AlertComponent } from ".";
import { Wrapper, Container } from "./styledContent";

export interface PasswordType {
    password: string;
    confirmPassword: string;
}

export const Content: FC = () => {
    const [passwordValue, setPasswordValue] = useState<PasswordType>({ password: "", confirmPassword: "" });
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper >
                <Title />
                <SubTitle />
                <InfoBlock />
                <Input
                    isError={isError}
                    passwordValue={passwordValue}
                    placeholderText={"Enter your password"}
                    typeValue={"password"}
                    setPasswordValue={setPasswordValue} />
                <Input
                    isError={isError}
                    passwordValue={passwordValue}
                    placeholderText={"Confirm password"}
                    typeValue={"confirmPassword"}
                    setPasswordValue={setPasswordValue} />
                <SubmitButton
                    passwordValue={passwordValue}
                    setIsError={setIsError}
                    setIsAlertActive={setIsAlertActive} />
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </Wrapper>
        </Container>
    )
}