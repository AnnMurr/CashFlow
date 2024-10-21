import { FC, useContext, useState } from "react";
import { ThemeContextType } from "../../../../../../contexts/themeContext/types";
import { ThemeContext } from "../../../../../../contexts/themeContext/themeContext";
import { AlertComponentProps } from "../../../../../shared/alert/alert";
import { InfoBlock, OutlinedInputComponent, SubmitButton, Title, AlertComponent } from ".";
import { useAppSelector } from "../../../../../../redux/store/store";
import { Container, Wrapper } from "./styledContent";

export const Content: FC = () => {
    const [emailValue, setEmailValue] = useState<string>("");
    const [isAlertActive, setIsAlertActive] = useState<null | AlertComponentProps>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const { loading } = useAppSelector((state => state.user));
    const themeContext = useContext<ThemeContextType>(ThemeContext);

    return (
        <Container themestyles={themeContext.themeStyles}>
            <Wrapper>
                <Title />
                <div>
                    <OutlinedInputComponent
                    isDisabled={loading}
                        isError={!!isError}
                        value={emailValue}
                        placeholderValue={"Enter your password"}
                        maxLengthNumber={30}
                        type="text"
                        handleChange={(event) => setEmailValue(event.target.value)} />
                </div>
                <InfoBlock />
                <SubmitButton
                    emailValue={emailValue}
                    setEmailValue={setEmailValue}
                    setIsAlertActive={setIsAlertActive}
                    setIsError={setIsError} />
                {isAlertActive ?
                    <AlertComponent type={isAlertActive.type} text={isAlertActive.text} />
                    : null}
            </Wrapper>
        </Container>
    )
}