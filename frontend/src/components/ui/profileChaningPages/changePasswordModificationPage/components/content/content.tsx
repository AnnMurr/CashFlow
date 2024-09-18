import { FC, useContext, useState } from "react";
import { AlertComponent, AlertComponentProps } from "../../../../../shared/alert/alert";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { Title } from "./components/title/title";
import { SubTitle } from "./components/subTitle/subTitle";
import { InfoBlock } from "./components/infoBlock/infoBlock";
import { Input } from "./components/input/input";
import { SubmitButton } from "./components/button/button";
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